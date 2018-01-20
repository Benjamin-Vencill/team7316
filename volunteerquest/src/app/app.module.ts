import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FirebaseConfig } from '../environments/firebase.config';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(FirebaseConfig.team7316_firebase),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNUN-r7YDLYvW_tk2ISGfSTZGA0B2XXc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
