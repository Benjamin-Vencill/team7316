import { AgmCoreModule } from '@agm/core';
import { Component, OnInit, NgZone } from '@angular/core';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GooglemapService } from '../services/googlemap.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Event } from './event.model';
import { User } from '../auth/user';
import { QueryFn } from 'angularfire2/firestore';
import { Form } from '@angular/forms/src/directives/form_interface';

import { SearchTitlePipe } from '../pipes/search-title.pipe';
import { SearchCategoryPipe } from '../pipes/search-category.pipe';
import { SearchGeospatialPipe } from '../pipes/search-geospatial.pipe';

@Component({
  selector: 'app-manage-events',
  providers: [EventManagerService, GooglemapService],
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

  eventForm: FormGroup;
  filterForm: FormGroup;
  events$: Observable<Event[]>;
  title_query: string;
  address: string;
  eventLat: number;
  eventLng: number;

  constructor(private EventManagerService: EventManagerService,
              private GoogleMapService: GooglemapService,
              private __zone: NgZone) { }

  ngOnInit() {
    this.events$ = this.EventManagerService.getCollection$();
    
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
    const street = '';
    const city = '';
    const zipcode = '';

    console.log("in save method, address:", JSON.stringify(address));
    this.GoogleMapService.getGeocoding(address).subscribe(result => {
        this.__zone.run(() => {
          console.log("in save method, result from google maps:", JSON.stringify(result));
          if (result.hasOwnProperty('lat')) {
            //Save data to firestore
            this.eventLat = result.lat();
            this.eventLng = result.lng();
            this.EventManagerService.add({title, content, likes:0, street, city, zipcode, 
                                          lat: this.eventLat, lng: this.eventLng});
          } else {
            console.log("unable to get coordinates from inputted address");
          }
        })
      },
      error => console.log("in save method, received following error:", error),
      () => console.log("done")
    );
  }

  filterEventsByTitle(ref?: QueryFn) {
    console.log('title == ' + this.title_query);
    this.events$ = this.EventManagerService.getCollection$(ref => ref.where("title", '==', this.title_query))
  }

  like(post: Event) {
    // this.EventManagerService.update(post.id, {likes: post.likes + 1});
  }

  remove(id: string) {
    this.EventManagerService.remove(id);
  }



}
