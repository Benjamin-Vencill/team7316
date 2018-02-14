import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from '../auth/auth.service';
import { EventEditComponent } from '../app/event-edit/event-edit.component';
import { ViewEventComponent } from '../view-event/view-event.component'
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../auth/user';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventManagerService } from '../search-engine/event-manager.service';
import { Event } from '../manage-events/event.model';

interface Marker {
  lat: number;
  lng: number;
  label?: string; // '?' makes this parameter optional
}

@Component({
  selector: 'map-view',
  providers: [EventManagerService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  title: string = 'app';
  lat: number = 33.7490;
  lng: number = -84.3880;
  zoom: number = 10;

  private uid: string;
  private linkRef: AngularFirestoreDocument<User>;
  user$: Observable<User>;

  markerCollection: AngularFirestoreCollection<Marker>;
  markers$: Observable<Event[]>;

  //events$: Observable<Event[]>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authService: AuthService,
              private eventManagerService: EventManagerService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.firebaseAuth.authState.subscribe((auth) => {
      console.log("auth:", auth);
      if (auth) {
        this.uid = auth.uid;
        console.log("uid:", this.uid);
        this.linkRef = this.afs.doc(`users/${this.uid}`);
        this.user$ = this.linkRef.valueChanges();
      }
    });
   }

  ngOnInit() {
    this.markerCollection = this.afs.collection('markers'); //reference
    this.getEventMarkers()

  }

  getEventMarkers() {
    this.markers$ = this.eventManagerService.getCollection$();
    console.log('Events for map:');
    console.log(this.markers$);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  openSignInDialog(): void {
    let dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result is:', JSON.stringify(result));
    });
  }

  openPostEventDialog(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      width: '30em'
    });
    
  }

  openViewAllEventsDialog(): void {
    let dialogRef = this.dialog.open(ViewEventComponent, {
      height: '400px',
      width: '30em'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result is:', JSON.stringify(result));
    });
  }

  signOut() {
    console.log("in signOut method, map component");
    this.firebaseAuth
      .auth
      .signOut();
    this.user$ = null; // Need to assign null to the user observable
    this.snackBar.open("Signed Out", "Okay", {
      duration: 2500
    });
  }

  test_markers: Marker[] = [
    {
      lat: 33.7490,
      lng: -84.2990,
      label: "Animal Shelter Event"
    },
    {
      lat: 33.8130,
      lng: -84.3920,
      label: "After School Tutoring"
    }
  ]
}