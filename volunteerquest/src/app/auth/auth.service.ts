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
  private authState: any;
  private userDocument: AngularFirestoreDocument<User>;
  private uid: string;
  userData:User;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) 
    {
      // Get auth data, then get Firestore DB user document || null
      this.authState = this.firebaseAuth.authState;
      this.user = this.firebaseAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // Call valueChanges to get data as Observable
          } else {
            return Observable.of(null);
          }
        });  
  }



  signup(email: string, password: string):Promise<User> {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        console.log('Success!', user.uid);
        return user;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email:string, password:string):Promise<User> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      this.userDocument = this.afs.doc(`users/${user.uid}`);
      this.userDocument.valueChanges().subscribe(userData => {
        this.uid = this.firebaseAuth.auth.currentUser.uid;
        this.userData = userData;
      });
      return this.userData;
    });
  }

  logout() {
    this.setUserStatus('offline');
    this.firebaseAuth.auth.signOut();
    this.userDocument = null;
  }

  setUserStatus(status:string): void {
    const path = `users/${this.currentUserID}`;
    const data = {
      status: status
    };
    this.afs.doc<User>(path).update(data)
    .catch(error => console.log(error));
  }

  setUserData(userData: User) {
    const path = `users/${this.currentUserID}`;
    this.afs.collection('users').doc(this.currentUserID).set(userData)
    .catch(error => console.log(error));
  }

  authUser() {
    return this.user;
  }

  get currentUserID(): string {
    return this.authState !== null ? this.authState.uid : '';
  }


  //Consider moving this logic to a separate class if it becomes overly complex
  // Role-based Authorization, only on client side. There are separate rules stated
  // in the firestore DB that are more secure

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }
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


