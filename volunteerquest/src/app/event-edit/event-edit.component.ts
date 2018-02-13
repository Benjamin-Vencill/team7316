import { Component, OnInit, NgZone } from '@angular/core';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { GooglemapService } from '../services/googlemap.service';
import { MatDialogRef, MatSelect } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MaterialTimeControlModule } from '../../../node_modules/material-time-control/src/material-time-control.module';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'event-edit',
  providers: [EventManagerService, GooglemapService],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  constructor(private EventManagerService: EventManagerService,
              private GoogleMapService: GooglemapService,
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
  URL: string;
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

  }

  createEvent() {
    // this.EventManagerService.add
    console.log("In createEvent");
    let address = this.street + ', ' + this.city + ', ' + this.state + ', ' + this.zipcode;
    this.GoogleMapService.getGeocoding(address).subscribe(result => {
      this.__zone.run(() => {
        console.log("Result from Google Maps:", JSON.stringify(result));
        if (result.hasOwnProperty('lat')) {
          //Save data to firestore
          this.lat = result.lat();
          this.lng = result.lng();
          this.EventManagerService.add({title: this.title, content: this.content,
                                        likes: this.likes, lat: this.lat, lng: this.lng,
                                        street: this.street, city: this.city,
                                        zipcode: this.zipcode, date: this.date});
        } else {
          console.log("Unable to get coordinates from inputted address");
        }
      })
    },
      error => console.log("In save method, received following error:", error),
      () => console.log("Done")
    );
  }

  editEvent() {
    // this.EventManagerService.getCollection$
  }
}
