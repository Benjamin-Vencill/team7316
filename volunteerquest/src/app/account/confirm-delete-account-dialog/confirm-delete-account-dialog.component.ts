import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-delete-account-dialog',
  templateUrl: './confirm-delete-account-dialog.component.html',
  styleUrls: ['./confirm-delete-account-dialog.component.css']
})

export class ConfirmDeleteAccountDialogComponent {

  private deleteAccount: boolean;
 
  constructor(public filterDialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  confirmDeleteAccount(): void {
    this.deleteAccount = true;
    this.filterDialogRef.close(this.deleteAccount);
  }

  cancelDeleteAccount(): void {
    this.deleteAccount = false;
    this.filterDialogRef.close(this.deleteAccount);
  }

}
