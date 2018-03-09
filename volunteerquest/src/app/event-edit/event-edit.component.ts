import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { GooglemapService } from '../services/googlemap.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialTimeControlModule } from '../../../node_modules/material-time-control/src/material-time-control.module';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'event-edit',
  providers: [EventManagerService, GooglemapService],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private EventManagerService: EventManagerService,
              public dialogRef: MatDialogRef<EventEditComponent>,
              private GoogleMapService: GooglemapService,
              public snackBar: MatSnackBar,
              private __zone: NgZone) { }

  states = [
    {value: 'GA', viewValue: 'Georgia'},
  ];

  title: string;
  content: string;
  likes: number = 0;
  lat: number;
  lng: number;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  category: string;
  url: string;
  date: Date;
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  time = {hour: 12, minute: 0, meriden: 'PM', format: 12};
  eventForm: FormGroup;

  dateFilter = (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    // Prevent dates before today from being selected.
    return date > yesterday;
  }

  ngOnInit() {
    // console.log("In createEvent, uid:", this.data.uid);
  }

  createEvent() {
    // this.EventManagerService.add
    console.log(this.time);
    let address = this.street + ', ' + this.city + ', ' + this.state + ', ' + this.zipcode;
    let datetime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.time.hour, this.time.minute)
    // console.log("address:", JSON.stringify(address));
    this.GoogleMapService.getGeocoding(address).subscribe(result => {
      this.__zone.run(() => {
        // console.log("Result from Google Maps:", JSON.stringify(result));
        if (result.hasOwnProperty('lat')) {
          //Save data to firestore
          this.lat = result.lat();
          this.lng = result.lng();
          this.EventManagerService.add({title: this.title, content: this.content,
                                        likes: this.likes, lat: this.lat, lng: this.lng,
                                        street: this.street, city: this.city,
                                        zipcode: this.zipcode, date: datetime,
                                        uid: this.data.uid, category: 'humanitarian', expanded: false,
                                        contactPerson: this.contactPerson, contactNumber: this.contactNumber,
                                        contactEmail: this.contactEmail })
          .catch(onrejected => {
            console.log("Unable to add event, onrejected:", onrejected);
          })
          .then(value => {
            console.log("Successfully added event, value:", value);
            this.dialogRef.close();
            this.snackBar.open("Created New Event: " + this.title, '', {
              duration: 2500
            });
          })
        } else {
          console.log("Unable to get coordinates from inputted address");
          this.snackBar.open("The provided address was invalid, unable to create event", '', {
            duration: 2800
          });
        }
      })
    },
    error => {
      console.log("Error:", error)
      this.snackBar.open(error, '', {
        duration: 2800
      })
    },
      () => console.log("Done")
    );
  }

  editEvent() {
    // this.EventManagerService.getCollection$
  }
}
