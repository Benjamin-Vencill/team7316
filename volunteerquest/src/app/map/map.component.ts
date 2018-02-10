import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from '../auth/auth.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../auth/user';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Marker {
  lat: number;
  lng: number;
  label?: string; // '?' makes this parameter optional
}

@Component({
  selector: 'map-view',
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

  eventsCollection: AngularFirestoreCollection<Event>;
  events$: Observable<Event[]>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authService: AuthService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  ngOnInit() {
    console.log("In ngoninit");
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

    // Seems as though need to be able to use values in the user.filterOptions
    // object to filter on the events in the events collection to then 
    // show as markers on the map

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
      width: '30em',
      disableClose: true
    });

    filterDialogRef.afterClosed().subscribe(filterOptions => {
      console.log('The filter dialog was closed, result is:', JSON.stringify(filterOptions));
      if (filterOptions.saveThisFilter) {
        // TODO: update the returned filterobject to the user document
      }
      // Now, retrieve the events from the events collection and update the 
      // markers displayed in the map view
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