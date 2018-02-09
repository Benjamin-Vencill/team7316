import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../auth/user';
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
  hide: boolean = true;
  
  private linkRef: AngularFirestoreDocument<User>;

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
              private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              public snackBar: MatSnackBar) {
  }

  /**
   * Invoked if already registered user signs in
   */
  signin() {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email.value, this.password)
      .then(userAuthInfo => {
        this.linkRef = this.afs.doc(`users/${userAuthInfo.uid}`);
        this.linkRef.valueChanges().subscribe(userData => {
          this.dialogRef.close();
          if (userData.roles.volunteer) {
            this.snackBar.open("Welcome, " + userData.firstName, '', {
              duration: 2500
            });
          } else {
            this.snackBar.open("Welcome " + userData.nonProfitName, '', {
              duration: 2500
            });
          }
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "Okay", {
          duration: 2500
        });
      });
  }

  /**
   * Invoked if volunteer is registering
   */
  volunteerRegistration() {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email.value, this.password)
      .then(userAuthInfo => {
        // Make call to insert new volunteer in firestore users collection
        this.isVolunteer = true
        this.updateUserData(userAuthInfo);
        this.linkRef = this.afs.doc(`users/${userAuthInfo.uid}`);
        this.linkRef.valueChanges().subscribe(userData => {
          this.dialogRef.close();
          this.snackBar.open("Welcome and thank you for registering, " + userData.firstName, "", {
            duration: 2500
          });
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "Okay", {
          duration: 2500
        });
      });
  }

  /**
   * Invoked if nonprofit is registering
   */  nonProfitRegistration() {   
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email.value, this.password)
      .then(userAuthInfo => {
        // Make call to insert new nonprofit user in firestore users collection
        this.isNonprofit = true
        this.updateUserData(userAuthInfo);
        this.linkRef = this.afs.doc(`users/${userAuthInfo.uid}`);
        this.linkRef.valueChanges().subscribe(userData => {
          this.dialogRef.close();
          this.snackBar.open("Welcome and thank you for registering, " + userData.nonProfitName, "", {
            duration: 2500
          });
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "Okay", {
          duration: 2500
        });
      });
  }

  /**
   * Creates a reference to the actual user document in Firestore DB.
   * @param userAuthInfo Authentication information associated with signed-in user
   */
  private updateUserData(userAuthInfo) {
    //Set user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userAuthInfo.uid}`);
    const data: User = {
      uid: userAuthInfo.uid,
      email: userAuthInfo.email,
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
        //TODO: enable sign-up with token for editor privalage?
        editor: false,
        admin: false,
        volunteer: this.isVolunteer,
        nonprofit: this.isNonprofit
      }
    }
    return userRef.set(data, {merge: true}) //merge creates or updates data in non-destructive way
  }

  getErrorMessage() {
    return this.email.hasError('required') ? '' : 
      this.email.hasError('email') ? 'Not a valid email' : 
      '';
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
