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
  categoriesSelected: string[] = null;
  startDate: Date = null;
  endDate: Date = null;
  minDate = new Date();
  street: string = "";
  city: string = "";
  state: string = "Georgia";
  zipcode: string = "";
  radius: string = "";
  userFound: boolean;

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
    console.log("in filter dialog constructor data:", data);
   }

   ngOnInit() {
    if (this.data.userFilterOptions) {
      let filterOptions = this.data.userFilterOptions;
      // console.log("in filter, filterOptions:", JSON.stringify(filterOptions));
      this.userFound = true;
      this.startDate = filterOptions.startDate;
      this.endDate = filterOptions.endDate;
      this.street = filterOptions.address.split(', ')[0];
      this.city = filterOptions.address.split(', ')[1];
      this.zipcode = filterOptions.address.split(', ')[3];
      this.radius = filterOptions.radius_term;
      this.categoriesSelected = filterOptions.categoriesSelected;
    } else {
      this.categoriesSelected = [
        "humanitarian",
        "animals",
        "environmental",
        "education"
      ]
      this.userFound = false;
    }
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
            "saveThisFilter": true
          }
          console.log("in onSave, filterOptions:", JSON.stringify(filterOptions));
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
