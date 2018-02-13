import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../../search-engine/event-manager.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatSelect } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MaterialTimeControlModule } from '../../../node_modules/material-time-control/src/material-time-control.module';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'event-edit',
  providers: [EventManagerService],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  constructor(private EventManagerService: EventManagerService) { }

  states = [
    {value: 'GA', viewValue: 'Georgia'},
  ];

  eventName: string;
  eventDate: Date;
  // Appararently Angular Material does not have a time picker
  eventTime = {hour: 12, minute: 0, meriden: 'PM', format: 12};
  eventStreet: string;
  eventCity: string;
  eventState: string;
  eventZipCode: string;
  eventURL: string;
  eventContactPerson: string;
  eventContactNumber: string;
  eventContactEmail: string;
  eventDescription: string;
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
  }

  editEvent() {
    // this.EventManagerService.getCollection$
  }
}
