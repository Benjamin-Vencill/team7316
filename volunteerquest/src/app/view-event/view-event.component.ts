import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Event } from '../manage-events/event.model';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import { EventManagerService } from '../services/search-engine/event-manager.service';

@Component({
  selector: 'app-view-event',
  providers:  [EventManagerService],
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  events$: Observable<Event[]>;
  private uid: string;


  constructor(public dialogRef: MatDialogRef<ViewEventComponent>,
              private firebaseAuth: AngularFireAuth,
              private EventManagerService: EventManagerService,) {
    this.firebaseAuth.authState.subscribe((auth) => {
      console.log("auth:", auth);
      if (auth) {
        this.uid = auth.uid;
        console.log("uid:", this.uid);
      }
    })
    
  }

  ngOnInit() {
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("uid", '==', this.uid));
    if (!this.events$) {
      console.log("no events");
    }
  }

  deleteEvent(eventID: string) {
    console.log("eventID:", eventID);
    this.EventManagerService.remove(eventID);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
