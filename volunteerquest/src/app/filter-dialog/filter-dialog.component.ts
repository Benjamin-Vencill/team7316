import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GooglemapService } from '../services/googlemap.service';

@Component({
  selector: 'app-filter-dialog',
  providers: [GooglemapService],
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
  minDate = new Date();
  street: string = "";
  city: string = "";
  state: string = "Georgia";
  zipcode: string = "";
  radius: number;

  categories = [
    "Humanitarian",
    "Animals",
    "Environmental",
    "Education"
  ]

  // Update the markers upon dialog close?
  constructor(public filterDialogRef: MatDialogRef<FilterDialogComponent>,
    private GoogleMapService: GooglemapService,
    private __zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data:", data);
   }

  onApply(): void {
    let address = this.street + ", " + this.city + ", " + this.state + 
                  ", " + this.zipcode;
    // console.log("address:", JSON.stringify(address));
    this.GoogleMapService.getGeocoding(address).subscribe(result => {
      this.__zone.run(() => {
        // console.log("Result from Google Maps:", JSON.stringify(result));
        if (result.hasOwnProperty('lat')) {
          // this.lat = result.lat();
          // this.lng = result.lng();
          let filterOptions = {
            "categoriesSelected": this.categoriesSelected,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "lat": result.lat(),
            "lng": result.lng(),
            "address": address,
            "radius_term": this.radius,
            "saveThisFilter": false
          }
          console.log("in onApply, filterOptions:", JSON.stringify(filterOptions));
          this.filterDialogRef.close(filterOptions);
        } else {
          console.log("Unable to get coordinates from inputted address");
        }
      })
    },
    error => {
      console.log("Error:", error)
    });
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
