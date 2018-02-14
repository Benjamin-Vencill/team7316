import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventManagerService } from '../../search-engine/event-manager.service';

@Component({
  selector: 'event-edit',
  providers: [EventManagerService],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  constructor(private EventManagerService: EventManagerService) { }

  eventName: string;
  eventForm: FormGroup;


  ngOnInit() {

  }
  
  createEvent() {
    // this.EventManagerService.add
  }

  editEvent() {
    // this.EventManagerService.getCollection$
  }

}
