import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../auth/user';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  email: string;
  password: string;
  phoneNumber: string;
  user: Observable<User>;

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>,
              private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore) {
    // Get auth data, then get Firestore DB user document || null
    this.user = this.firebaseAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // Call valueChanges to get data as Observable
        } else {
          return Observable.of(null);
        }
      })  
  }

  signup() {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(value => {
        this.email = this.password = '';
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });   
  }

  signin() {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(userAuthInfo => {
        // console.log("in login, value:", JSON.stringify(userAuthInfo));
        this.updateUserData(userAuthInfo);
        console.log('Nice, it worked!');
        this.email = this.password = '';
        this.dialogRef.close();
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
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
      roles: {
        //Default accounts are subscriber only. 
        subscriber: true,
        //TODO: enable sign-up with token for editor privalage?
        editor: false,
        admin: false
      }
    }
    return userRef.set(data, {merge: true}) //merge creates or updates data in non-destructive way
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
