import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
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

  authState: any = null;
  private uid: string;
  private linkRef: AngularFirestoreDocument<User>;
  private link: Observable<any>;
  user: Observable<User>;
  userData: User;

  markerCollection: AngularFirestoreCollection<Marker>;
  markers: Observable<Marker[]>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore, 
              private authService: AuthService,
              public snackBar: MatSnackBar, 
              public dialog: MatDialog) {
    this.firebaseAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.uid = this.authState.uid;
      // console.log("authState:", this.authState);
      console.log("uid:", this.uid);
      this.linkRef = this.afs.doc(`users/${this.uid}`);
      this.user = this.linkRef.valueChanges();
      this.user.subscribe(value => {
        console.log("value:", value);
        this.userData = value;
      });
    });
   }

  ngOnInit() {
    this.markerCollection = this.afs.collection('markers') //reference
    this.markers = this.markerCollection.valueChanges() //observable of notes reference

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

  signOut() {
    this.authService.logout();
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