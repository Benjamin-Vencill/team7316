import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


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

  markerCollection: AngularFirestoreCollection<Marker>;
  markers: Observable<Marker[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService,
              public snackBar: MatSnackBar) {
    if (this.authService.user) {
      console.log("auth user:", this.authService);
    } else {
      console.log("auth:", this.authService);
    }
   }

  ngOnInit() {
    this.markerCollection = this.afs.collection('markers') //reference
    this.markers = this.markerCollection.valueChanges() //observable of notes reference

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
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