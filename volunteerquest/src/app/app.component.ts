import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app';
  lat: number = 33.7490;
  lng: number = -84.3880;
  zoom: number = 10;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers: marker[] = [
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

  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';
  constructor(public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
  this.user = afAuth.authState;
  this.items = afDb.list('items');
}

login() {
  this.afAuth.auth.signInAnonymously();
}
logout() {
  this.afAuth.auth.signOut();
}

Send(desc: any[]) {
  this.items.push({message});
  this.msgVal = '';

}

}

interface marker {
  lat: number;
  lng: number;
  label?: string; // '?' makes this parameter optional
}

