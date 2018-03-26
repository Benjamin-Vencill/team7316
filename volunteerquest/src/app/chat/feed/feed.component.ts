import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed$: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed$ = this.chat.getMessages$();
  }

  ngOnChanges() {
    this.feed$ = this.chat.getMessages$();
  }

}
