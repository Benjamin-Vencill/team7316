import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Event } from '../manage-events/event.model';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { ConfirmDeleteEventDialogComponent } from '../confirm-delete-event-dialog/confirm-delete-event-dialog.component';


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

  // First confirms with user if they would like to delete the event and then if confirmed, 
  // deletes the event
  deleteEvent(eventID: string, eventContent: string, eventTitle: string, eventDate: Date, eventStreet: string) {
    let dialogRef = this.dialog.open(ConfirmDeleteEventDialogComponent, {
      width: '30em',
      data: { eventContent: eventContent,
            eventTitle: eventTitle,
            eventDate: eventDate,
            eventStreet: eventStreet }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("The confirm delete event dialog was closed");
      console.log("result:", result);
      if (result) {
        this.EventManagerService.remove(eventID);
        console.log("event was deleted")
      } else {
        console.log("event was not deleted")
      }
    })
  }

  editEventDialog(event: Event) {
    console.log("event:", JSON.stringify(event));
    // Get the data associated with this event and pass it to the event dialog component
    let dialogRef = this.dialog.open(EventEditComponent, {
      width: '30em',
      data: {event: event}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The edit event dialog was closed");
      this.events$ = this.EventManagerService.getCollection$(ref => ref.where("uid", '==', this.uid));
      if (!this.events$) {
        console.log("no events");
      }
    })
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
