import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { QueryFn } from 'angularfire2/firestore/interfaces';

import { Event } from '../../manage-events/event.model';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class EventManagerService {
  //Service for CRUD (Create, Read, Update, Delete) opeerations in firestore

  readonly path = 'events';

  constructor(private afs: AngularFirestore) { }

  //Create
  add(data: Event): Promise<DocumentReference> {
    return this.afs.collection<Event>(this.path).add({...data});
  }

  //Read
  getCollection$(ref?: QueryFn): Observable<Event[]> {
    return this.afs.collection<Event>(this.path, ref)
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  //Update
  update(id: string, data: Partial<Event>): Promise<void> {
    return this.afs.doc<Event>(`${this.path}/${id}`).update(data);
  }

  //Delete
  remove(id: string): Promise<void> {
    return this.afs.doc<Event>(`${this.path}/${id}`).delete();
  }
}
