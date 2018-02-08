import { AgmCoreModule } from '@agm/core';
import { Component, OnInit, NgZone } from '@angular/core';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GooglemapService } from '../services/googlemap.service';
import { Observable } from 'rxjs/Observable';
import { Event } from './event.model';
import { QueryFn } from 'angularfire2/firestore';
import { Form } from '@angular/forms/src/directives/form_interface';

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
  address: string;

  constructor(private EventManagerService: EventManagerService) { }

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
    const address = this.address;
    console.log("in save method, address:", JSON.stringify(address));

    //Save data to firestore
    this.EventManagerService.add({title, content, likes:0});
  }

  filterEventsByTitle(ref?: QueryFn) {
    console.log('title == ' + this.title_query);
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("title", '==', this.title_query))
  }

  like(post: Event) {
    this.EventManagerService.update(post.id, {likes: post.likes + 1});
  }

  remove(id: string) {
    this.EventManagerService.remove(id);
  }



}
