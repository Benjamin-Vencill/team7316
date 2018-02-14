import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})

export class FilterDialogComponent {
  categoriesSelected: string[] = [
    "humanitarian",
    "animals",
    "environmental",
    "education"
  ];
  startDate: Date = null;
  endDate: Date = null;
  radius: number = 0;

  categories = [
    "Humanitarian",
    "Animals",
    "Environmental",
    "Education"
  ]

  // Update the markers upon dialog close?
  constructor(public filterDialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data:", data);
   }

  onApply(): void {

    let filterOptions = {
      "categoriesSelected": this.categoriesSelected,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "radius": this.radius,
      "saveThisFilter": false
    }
    console.log("in onApply, filterOptions:", filterOptions);
    this.filterDialogRef.close(filterOptions);
  }

  onSave(): void {
    let filterOptions = {
      "categoriesSelected": this.categoriesSelected,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "radius": this.radius,
      "saveThisFilter": true
    }
    console.log("in onSave, filterOptions:", filterOptions);
    this.filterDialogRef.close(filterOptions);
  }

  selectCategory(category) {
    let categoryLowerCase = category.toLowerCase();
    console.log("in addCategory, categoryLowerCase:", categoryLowerCase);
    let index = this.categoriesSelected.indexOf(categoryLowerCase);
    if (index !== -1) {
      // Category deselected, remove from array of selected categories
      this.categoriesSelected.splice(index, 1);
    } else {
      this.categoriesSelected.push(categoryLowerCase);
    }
    console.log(this.categoriesSelected);
  }
}
