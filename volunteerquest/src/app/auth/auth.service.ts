import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';
import { merge } from 'rxjs/observable/merge';

/**
 * This auth service facilitates the sign-in process, watches the user 
 * session, and enables saving custom user data to the Firestore DB (see
 * the user.ts, an interface for a User object)
 */
@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) { 

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

  authUser() {
    return this.user;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  // login(email: string, password: string) {
  //   this.firebaseAuth
  //     .auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(userAuthInfo => {
  //       // console.log("in login, value:", JSON.stringify(userAuthInfo));
  //       this.updateUserData(userAuthInfo);
  //       console.log('Nice, it worked!');
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });
  // }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  /**
   * Creates a reference to the actual user document in Firestore DB.
   * @param userAuthInfo Authentication information associated with signed-in user
   */
  // private updateUserData(userAuthInfo) {
  //   //Set user data to firestore on login
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userAuthInfo.uid}`);
  //   const data: User = {
  //     uid: userAuthInfo.uid,
  //     email: userAuthInfo.email,
  //     roles: {
  //       //Default accounts are subscriber only. 
  //       subscriber: true,
  //       //TODO: enable sign-up with token for editor privalage?
  //       editor: false,
  //       admin: false
  //     }
  //   }
  //   return userRef.set(data, {merge: true}) //merge creates or updates data in non-destructive way
  // }

  //Consider moving this logic to a separate class if it becomes overly complex
  // Role-based Authorization, only on client side. There are separate rules stated
  // in the firestore DB that are more secure
  /**
   * Determine if user has access to reading some document
   * @param user 
   */
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }
  /**
   * Determine if user has acces to edit some document.
   * @param user 
   */
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }
  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  canCreateEvent(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  /**
   * Helper method to determine if a given user has the necessary role 
   * for a given ability/functionality within the app
   */
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    // Check roles of provided user, if user has role, enable functionality
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true;
      }
    }
    return false;
  }

}


