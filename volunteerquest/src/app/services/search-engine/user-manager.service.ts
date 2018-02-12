import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { QueryFn } from 'angularfire2/firestore/interfaces';

import { User } from '../../auth/user';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class UserManagerService {
  //Service for CRUD (Create, Read, Update, Delete) opeerations in firestore

  readonly path = 'users';

  constructor(private afs: AngularFirestore) { }

  //Create
  add(data: User): Promise<DocumentReference> {
    return this.afs.collection<User>(this.path).add({...data});
  }

  //Read
  getCollection$(ref?: QueryFn): Observable<User[]> {
    return this.afs.collection<User>(this.path, ref)
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  //Update
  update(id: string, data: Partial<User>): Promise<void> {
    // console.log("in user manager service update");
    return this.afs.doc<User>(`${this.path}/${id}`).update(data);
  }

  //Delete
  remove(id: string): Promise<void> {
    return this.afs.doc<User>(`${this.path}/${id}`).delete();
  }
}
