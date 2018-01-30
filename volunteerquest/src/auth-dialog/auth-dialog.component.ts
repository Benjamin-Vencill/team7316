import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { User } from '../auth/user';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  checked: boolean = false;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  user: Observable<User>;

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
              private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              public snackBar: MatSnackBar) {
    
  }

  /**
   * Invoked if volunteer is registering
   */
  volunteerRegistration() {
    // console.log("volunteer registration, firstName:", this.firstName,
    // "lastName:", this.lastName, "phoneNumber:", this.phoneNumber,
    // "email:", this.email.value, "password:", this.password);
    if (this.phoneNumber == null) {
      this.phoneNumber = '';
    }
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email.value, this.password)
      .then(userAuthInfo => {
        // console.log("in volunteerRegistration, userAuthInfo:", JSON.stringify(userAuthInfo));
        // Make call to insert new volunteer document in firestore
        this.updateUserData(userAuthInfo);
        console.log('Success!', JSON.stringify(userAuthInfo));
        this.dialogRef.close();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.snackBar.open("Unable to register: " + err.message, "Okay", {
          duration: 2500
        });
      });   
  }

  /**
   * Invoked if nonprofit is registering
   */  nonProfitRegistration() {
    console.log("nonprofit registration, firstname value:", JSON.stringify(this.firstName));
    // this.firebaseAuth
    //   .auth
    //   .createUserWithEmailAndPassword(this.email.value, this.password)
    //   .then(value => {
    //     this.password = '';
    //     console.log('Success!', value);
    //   })
    //   .catch(err => {
    //     console.log('Something went wrong:', err.message);
    //   });   
  }

  signin() {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email.value, this.password)
      .then(userAuthInfo => {
        console.log('Nice, it worked!');
        this.dialogRef.close();
        this.snackBar.open("Welcome", '', {
          duration: 2500
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.snackBar.open("Incorrect email or password", "Okay", {
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
      roles: {
        //Default accounts are subscriber only. 
        subscriber: true,
        //TODO: enable sign-up with token for editor privalage?
        editor: false,
        admin: false,
        volunteer: !this.checked,
        nonprofit: this.checked
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
