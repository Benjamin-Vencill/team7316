import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-delete-event-dialog',
  templateUrl: './confirm-delete-event-dialog.component.html',
  styleUrls: ['./confirm-delete-event-dialog.component.css']
})
export class ConfirmDeleteEventDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data:", data);
   }

}
