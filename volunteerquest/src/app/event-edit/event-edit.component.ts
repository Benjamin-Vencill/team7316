import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../../search-engine/event-manager.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatSelect } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

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
  // Appararently Angular Material does not have a time picker
  eventDate: Date;
  eventTime: string;
  eventStreet: string;
  eventCity: string;
  eventState: string;
  eventZip: string;
  eventURL: string;
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
