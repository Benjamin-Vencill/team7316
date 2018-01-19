import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';

import { HttpModule }    from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CoursesListComponent } from './courses-list/courses-list.component';
// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCLKfShq3yED7Z6xW2AEp_5aFhhlQy6jLI",
  authDomain: "team7316-95c69.firebaseapp.com",
  databaseURL: "https://team7316-95c69.firebaseio.com",
  projectId: "team7316-95c69",
  storageBucket: "team7316-95c69.appspot.com",
  messagingSenderId: "449624858267"
};

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNUN-r7YDLYvW_tk2ISGfSTZGA0B2XXc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
