import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User, Roles } from '../auth/user';
import { Validators } from '@angular/forms';
import { isEmpty } from '@firebase/util';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  isNonprofit: boolean = false;
  isVolunteer: boolean = false;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string = "";
  nonProfitName?: string = "";
  nonProfitDescription?: string = "";
  nonProfitAddress?: string = "";
  nonProfitCity?: string = "";
  nonProfitState?: string = "";
  nonProfitZipCode?: string = "";
  nonProfitWebURL?: string = "";
  status: string = "offline";
  hide: boolean = true;
  
  private user: User;
  private userDocument: AngularFirestoreDocument<User>;

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
              private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authService: AuthService,
              public snackBar: MatSnackBar) {
  }

  signin() {
    this.authService.login(this.email.value, this.password, (userData) => {
      console.log("userData:", JSON.stringify(userData));
        this.user = userData;
        this.dialogRef.close();
        if (this.user.roles.volunteer) {
          this.showGreetUserSnackBar(userData.firstName);
        } else {
          this.showGreetUserSnackBar(userData.nonProfitName);
        }
    });
  }

  showGreetUserSnackBar(name:string) {
    this.snackBar.open("Welcome, " + name, '', {
      duration: 2500
    });
  }

  showThanksForRegisteringSnackBar(name: string) {
    this.snackBar.open("Welcome and thank you for registering, " + name, "", {
      duration: 2500
    });
  }

  /**
   * Invoked if volunteer is registering
   */
  volunteerRegistration() {
    this.authService.signup(this.email.value, this.password)
    .then((user) => {
      const newUser: User = {
        uid: user.uid,
        email: this.email.value,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        nonProfitName: this.nonProfitName,
        nonProfitDescription: this.nonProfitDescription,
        nonProfitAddress: this.nonProfitAddress,
        nonProfitCity: this.nonProfitCity,
        nonProfitState: this.nonProfitState,
        nonProfitZipCode: this.nonProfitZipCode,
        nonProfitWebURL: this.nonProfitWebURL,
        roles: {
          //Default accounts are subscriber only. 
          subscriber: true,
          editor: false,
          admin: false,
          volunteer: true,
          nonprofit: false
        },
        status: this.status
      }
      this.user = user;
      this.authService.setUserData(newUser);
      this.authService.setUserStatus('online');
      this.dialogRef.close();
      this.showThanksForRegisteringSnackBar(this.firstName);
    }).catch((error) => console.log(error));
  }

  /**
   * Invoked if nonprofit is registering
   */  
  nonProfitRegistration() {
    this.authService.signup(this.email.value, this.password)
    .then((user) => {
      const newUser: User = {
        uid: user.uid,
        email: this.email.value,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        nonProfitName: this.nonProfitName,
        nonProfitDescription: this.nonProfitDescription,
        nonProfitAddress: this.nonProfitAddress,
        nonProfitCity: this.nonProfitCity,
        nonProfitState: this.nonProfitState,
        nonProfitZipCode: this.nonProfitZipCode,
        nonProfitWebURL: this.nonProfitWebURL,
        roles: {
          //Default accounts are subscriber only. 
          subscriber: true,
          editor: false,
          admin: false,
          volunteer: false,
          nonprofit: true
        },
        status: this.status
      }
      this.user = user;
      this.authService.setUserData(newUser);
      this.authService.setUserStatus('online');
      this.dialogRef.close();
      this.showThanksForRegisteringSnackBar(this.firstName);
    }).catch((error) => console.log(error));
  }

  getErrorMessage() {
    return this.email.hasError('required') ? '' : 
      this.email.hasError('email') ? 'Not a valid email' : 
      '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
