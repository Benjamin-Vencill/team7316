import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';
import { User } from '../../auth/user';
import { DocumentReference } from '@firebase/firestore-types';



@Injectable()
export class ChatService {

  path:string = 'chat_messages';
  user: firebase.User;
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessages$: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  userNameString:string;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe( auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userNameString = a.firstName;
      });
    })
   }

   getUser() {
     const userId = this.user.uid;
     const path = `users/${userId}`;
     return this.afs.doc<User>(path);
   }

   getUsers() {
     const path = `users`;
     return this.afs.collection<User>(path);
   }

   add(data: ChatMessage): Promise<DocumentReference> {
    return this.afs.collection<ChatMessage>(this.path).add({...data});
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeString();
    const email = this.user.email;
    this.chatMessages$ = this.getMessages$();
    this.add({
      email: email,
      userName: this.userNameString,
      message: msg,
      timeString: timestamp[0],
      timeSent: timestamp[1],
    });
  }
  
  getMessages$(): Observable<ChatMessage[]> {
    return this.afs.collection<ChatMessage>(this.path, ref => 
      ref.limit(25).orderBy('timeSent', 'asc'))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ChatMessage;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  getTimeString(): [string, Date] {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + 
                  now.getUTCMonth() + '/' +
                  now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                  now.getUTCMinutes() + ':' +
                  now.getSeconds();
    
    return ([date + ' ' + time, now]);
  }

}
