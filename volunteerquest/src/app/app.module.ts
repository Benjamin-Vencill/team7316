import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FirebaseConfig } from '../environments/firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';

import { AuthComponent } from '../auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig.team7316_firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNUN-r7YDLYvW_tk2ISGfSTZGA0B2XXc'
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
