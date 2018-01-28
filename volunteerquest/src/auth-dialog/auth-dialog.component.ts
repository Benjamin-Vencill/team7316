import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  email: string;
  password: string;
  phoneNumber: string;

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
              private authService: AuthService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  signin() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
    // It seems this class variable is not being updated before
    // this code hits. Seems the best way to handle this would 
    // be to pass a promise or callback once this.authService.login() finishes
    if(this.authService.signedIn) {
      console.log("signed in");
      this.dialogRef.close();
    } else {
      console.log("not signed in");
    }
    // console.log("authService:", this.authService.user);
  }

  logout() {
    this.authService.logout();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
