import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Http, Response, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as firebase from 'firebase/app';

import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from '../auth/auth.service';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { Event } from '../manage-events/event.model';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { SearchTitlePipe } from '../pipes/search-title.pipe';
import { SearchCategoryPipe } from '../pipes/search-category.pipe';
import { SearchGeospatialPipe } from '../pipes/search-geospatial.pipe';
import { User } from '../auth/user';
import { UserManagerService } from '../services/search-engine/user-manager.service';
import { ViewEventComponent } from '../view-event/view-event.component'

interface Marker {
  lat: number;
  lng: number;
  label?: string; // '?' makes this parameter optional
}

@Component({
  selector: 'map-view',
  providers: [UserManagerService, EventManagerService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  title: string = 'app';
  lat: number = 33.7490;
  lng: number = -84.3880;
  zoom: number = 10;
  categories: string[];
  startDate: Date;
  endDate: Date;

  private uid: string;
  private linkRef: AngularFirestoreDocument<User>;
  user$: Observable<User>;

  eventsCollection: AngularFirestoreCollection<Event>;
  events$: Observable<Event[]>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private userManagerService: UserManagerService,
              private authService: AuthService,
              private eventManagerService: EventManagerService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  ngOnInit() {
    console.log("In ngOnInit");
    this.firebaseAuth.authState.subscribe((auth) => {
      console.log("auth:", auth);
      if (auth) {
        this.uid = auth.uid;
        console.log("uid:", this.uid);
        this.linkRef = this.afs.doc(`users/${this.uid}`);
        this.user$ = this.linkRef.valueChanges();
        this.user$.subscribe(user => {
          console.log("user retrieved:", JSON.stringify(user));
          // Todo: get the filterOptions off of the found user 
          // document, and use these to get filtered events 
          // from firebase
          this.eventsCollection = this.afs.collection('events');  // reference
          this.events$ = this.eventsCollection.valueChanges();     // observable
        })
      }
    });
  }

    // Seems as though need to be able to use values in the user.filterOptions
    // object to filter on the events in the events collection to then 
    // show as markers on the map

  getEvents() {
    this.events$ = this.eventManagerService.getCollection$();
    console.log('Events for map:');
    console.log(this.events$);
  }

  clickedMarker(content: string, index: number) {
    console.log(`clicked the marker: ${content || index}`)
  }

  openSignInDialog(): void {
    let dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result is:', JSON.stringify(result));
    });
  }

  openFilterDialog(): void {
    let filterDialogRef = this.dialog.open(FilterDialogComponent, {
      width: '30em'
    });

    filterDialogRef.afterClosed().subscribe(filterOptions => {
      console.log('The filter dialog was closed, result is:', JSON.stringify(filterOptions));
      if (filterOptions) {
        // If user wants to save user options
        if (filterOptions.saveThisFilter) {
          delete filterOptions.saveThisFilter
          // TODO: update the returned filterobject to the user document
          this.userManagerService.update(this.uid, {filterOptions: filterOptions});
        } else {
          // If user just wants to apply changes without saving to database
          console.log(JSON.stringify(filterOptions));
          this.categories = filterOptions.categoriesSelected;
          this.startDate = filterOptions.startDate;
          this.endDate = filterOptions.endDate;
        }
      }
    });
  }

  openPostEventDialog(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      width: '30em',
      data: {uid: this.uid}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("The post event dialog was closed");
    })
  }

  openViewAllEventsDialog(): void {
    let dialogRef = this.dialog.open(ViewEventComponent, {
      // height: '400px',
      width: '30em',
      data: {uid: this.uid}
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
}