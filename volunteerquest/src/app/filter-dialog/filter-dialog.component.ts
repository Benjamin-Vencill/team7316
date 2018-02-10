import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})

export class FilterDialogComponent {
  categoryAnimals: Boolean = false;
  categoryEducation: Boolean = false;
  categoryEnvironment: Boolean = false;
  categorySeniors: Boolean = false;
  startDate: Date = null;
  endDate: Date = null;
  radius: number = 0;

  // Update the markers upon dialog close?
  constructor(public filterDialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data:", data);
   }

  onApply(): void {
    let filterOptions = {
      "categories": {
        "categoryAnimals": this.categoryAnimals,
        "categoryEducation": this.categoryEducation,
        "categoryEnvironment": this.categoryEnvironment,
        "categorySeniors": this.categorySeniors
      },
      "dataRange": {
        "startDate": this.startDate,
        "endDate": this.endDate
      },
      "radius": this.radius,
      "saveThisFilter": false
    }
    console.log("in onApply, filterOptions:", filterOptions);
    this.filterDialogRef.close(filterOptions);
  }

  onSave(): void {
    let filterOptions = {
      "categories": {
        "categoryAnimals": this.categoryAnimals,
        "categoryEducation": this.categoryEducation,
        "categoryEnvironment": this.categoryEnvironment,
        "categorySeniors": this.categorySeniors
      },
      "dataRange": {
        "startDate": this.startDate,
        "endDate": this.endDate
      },
      "radius": this.radius,
      "saveThisFilter": true
    }
    console.log("in onSave, filterOptions:", filterOptions);
    this.filterDialogRef.close(filterOptions);
  }
}
