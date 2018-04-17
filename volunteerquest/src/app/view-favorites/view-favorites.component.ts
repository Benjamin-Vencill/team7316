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
    private eventManagerService: EventManagerService,
    public filterDialogRef: MatDialogRef<ViewFavoritesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data:", JSON.stringify(this.data));
    this.events$ = this.eventManagerService.getCollection$(ref => ref.where("subscribers." + this.data.user, "==", true))
  }

  close() {
    this.filterDialogRef.close();
  }

  unfavoriteEvent(event) {
    console.log("in unfavoriteEvent:", JSON.stringify(event));
    delete event.subscribers[this.data.user];
    this.eventManagerService.update(event.id, {
      subscribers: event.subscribers
    });
  }
}