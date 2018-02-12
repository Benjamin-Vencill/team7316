import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../search-engine/event-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Event } from './event.model';
import { QueryFn } from 'angularfire2/firestore';
import { Form } from '@angular/forms/src/directives/form_interface';
import { User } from '../auth/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-manage-events',
  providers: [EventManagerService],
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

  eventForm: FormGroup;
  filterForm: FormGroup;
  events$: Observable<Event[]>;
  title_query: string;

  private uid: string;

  constructor(private EventManagerService: EventManagerService,
              private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe((auth) => {
      console.log("auth:", auth);
      if (auth) {
        this.uid = auth.uid;
        console.log("uid:", this.uid);
      }
    })
               }

  ngOnInit() {
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("likes", "<", 12).orderBy('likes', 'desc'));
    
    this.eventForm = new FormGroup ({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

    this.filterForm = new FormGroup ({
      title_query: new FormControl('', Validators.required),
    });
  }

  save() {
    const title = this.eventForm.get('title').value;
    const content = this.eventForm.get('content').value;
    
    //Save data to firestore
    this.EventManagerService.add({title, content, likes:0, uid: this.uid});
  }

  filterEventsByTitle(ref?: QueryFn) {
    console.log('title == ' + this.title_query);
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("title", '==', this.title_query))
  }

  filterEventsByCategory(ref?: QueryFn) {
    console.log('title == ' + this.title_query);
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("category", '==', this.title_query))
  }

  clearFilter() {
    this.events$ = this.EventManagerService.getCollection$();
  }

  like(post: Event) {
    this.EventManagerService.update(post.id, {likes: post.likes + 1});
  }

  remove(id: string) {
    this.EventManagerService.remove(id);
  }



}
