//Modules
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AuthModule } from '../auth/auth.module';

//Configs
import { FirebaseConfig } from '../environments/firebase.config';
import { GoogleMapsConfig } from '../environments/googlemaps.config';

//Services
import { AuthService } from '../auth/auth.service';

//Components
import { AuthComponent } from '../auth/auth.component';
import { AppComponent } from './app.component';
import { MapComponent } from '../map/map.component';
import { CannotFindPageComponent } from '../cannot-find-page/cannot-find-page.component';
import { EditPostComponent } from '../edit-post/edit-post.component';




@NgModule({
  imports: [
    AngularFireModule.initializeApp(FirebaseConfig.team7316_firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleMapsConfig.googleMapsAPI.apiKey.valueOf()
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    MapComponent, 
    CannotFindPageComponent,
    EditPostComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
