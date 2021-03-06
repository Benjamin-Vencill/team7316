import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialTimeControlModule } from './material-time-control/material-time-control.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

//Configs
import { FirebaseConfig } from '../environments/firebase.config';
import { GoogleMapsConfig } from '../environments/googlemaps.config';

//Services
import { AuthService } from './auth/auth.service';
import { ChatService } from './chat/services/chat.service';

//Components
import { AuthComponent } from './auth/auth.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AppComponent } from './app.component';
import { CannotFindPageComponent } from './cannot-find-page/cannot-find-page.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { FilterComponent } from './filter/filter.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { MapComponent } from './map/map.component';
import { ViewEventComponent } from './view-event/view-event.component';
//import { ViewEventsComponent } from '../view-events/view-events.component';
//import { VolunteerEventComponent } from '../volunteer-event/volunteer-event.component';

//Chatroom Components
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { FeedComponent } from './chat/feed/feed.component';
import { MessageComponent } from './chat/message/message.component';
import { UserListComponent } from './chat/user-list/user-list.component';
import { UserItemComponent } from './chat/user-item/user-item.component';

//Pipes
import { SearchTitlePipe } from './pipes/search-title.pipe';
import { SearchCategoryPipe } from './pipes/search-category.pipe';
import { SearchDatePipe } from './pipes/search-date.pipe';
import { SearchGeospatialPipe } from './pipes/search-geospatial.pipe';
import { ConfirmDeleteEventDialogComponent } from './confirm-delete-event-dialog/confirm-delete-event-dialog.component';
import { NonProfitAccountComponent } from './account/non-profit-account/non-profit-account.component';
import { ConfirmDeleteAccountDialogComponent } from './account/confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { VolunteerAccountComponent } from './account/volunteer-account/volunteer-account.component';
import { ViewFavoritesComponent } from './view-favorites/view-favorites.component';
import { MailSysComponent } from './mail-sys/mail-sys.component';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FirebaseConfig.team7316_firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleMapsConfig.googleMapsAPI.apiKey.valueOf()
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MaterialTimeControlModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    AuthDialogComponent,
    CannotFindPageComponent,
    EventEditComponent,
    EditPostComponent,
    FilterComponent,
    FilterDialogComponent,
    ManageEventsComponent,
    ViewEventComponent,
    MapComponent,
    SearchTitlePipe,
    SearchCategoryPipe,
    SearchDatePipe,
    SearchGeospatialPipe,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    ConfirmDeleteEventDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    NonProfitAccountComponent,
    VolunteerAccountComponent,
    ViewFavoritesComponent,
    MailSysComponent
  ],
  entryComponents: [
    AuthDialogComponent,
    ConfirmDeleteEventDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    FilterDialogComponent,
    EventEditComponent,
    ViewEventComponent,
    ViewFavoritesComponent,
    MailSysComponent
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
