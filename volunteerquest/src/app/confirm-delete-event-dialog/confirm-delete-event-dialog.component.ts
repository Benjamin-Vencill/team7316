import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-delete-event-dialog',
  templateUrl: './confirm-delete-event-dialog.component.html',
  styleUrls: ['./confirm-delete-event-dialog.component.css']
})

export class ConfirmDeleteEventDialogComponent {

  private deleteEvent: boolean;
 
  constructor(public filterDialogRef: MatDialogRef<ConfirmDeleteEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data:", this.data);
  }

  confirmDeleteEvent(): void {
    this.deleteEvent = true;
    this.filterDialogRef.close(this.deleteEvent);
  }

  cancelDeleteEvent(): void {
    this.deleteEvent = false;
    this.filterDialogRef.close(this.deleteEvent);
  }

}
