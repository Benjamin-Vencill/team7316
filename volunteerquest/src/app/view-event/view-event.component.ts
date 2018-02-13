import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Event } from '../manage-events/event.model';
import { EventEditComponent } from '../event-edit/event-edit.component';
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ViewEventComponent>,
              public dialog: MatDialog,
              private firebaseAuth: AngularFireAuth,
              private EventManagerService: EventManagerService) {
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

  openNewEventDialog() {
    // Close the current dialog and open the dialog to create new event
    let dialogRef = this.dialog.open(EventEditComponent, {
      width: '30em',
      data: {uid: this.uid}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("The post event dialog was closed");
      this.events$ = this.EventManagerService.getCollection$(ref => ref.where("uid", '==', this.uid));
      if (!this.events$) {
        console.log("no events");
      }
    })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
