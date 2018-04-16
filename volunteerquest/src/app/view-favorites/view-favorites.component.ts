import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Event } from '../manage-events/event.model';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-view-favorites',
  providers: [EventManagerService],
  templateUrl: './view-favorites.component.html',
  styleUrls: ['./view-favorites.component.css']
})
export class ViewFavoritesComponent implements OnInit {
  events$: Observable<Event[]>;
  private uid: string;
  favoriteEvents: string[];

  constructor(private firebaseAuth: AngularFireAuth,
    private EventManagerService: EventManagerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data:", JSON.stringify(this.data));
    if (this.data.favoriteEvents) {
      this.favoriteEvents = this.data.favoriteEvents;
      console.log("this.favoriteEvents:", JSON.stringify(this.favoriteEvents));
      // for (let i = 0; i < this.favoriteEvents.length; i++) {
      //   if (i == 0) {
      //     this.events$ = this.EventManagerService.getCollection$(ref => ref.where("id", '==', this.favoriteEvents[i]));
      //   } else {
      //     this.events$.concat(this.EventManagerService.getCollection$(ref => ref.where("id", '==', this.favoriteEvents[i])));
      //   }
      //   console.log("In iteration " + i + ", this.events$:", this.events$);
      // }
      this.events$ = this.EventManagerService.getCollection$(ref => ref);
      console.log("after for loop, this.events$:", this.events$);
      this.events$.subscribe(result => {
        if (result) {
          console.log("events:", JSON.stringify(result));
        }
      })
      // first.concat(second)
    } else {
      console.log("no events found")
    }
    // this.events$ = this.EventManagerService.getCollection$(ref => ref.where("uid", '==', this.uid));
    // if (!this.events$) {
    //   console.log("no events");
    // }
  }

}