import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { GooglemapService } from '../services/googlemap.service';
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
  providers: [UserManagerService, EventManagerService, GooglemapService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  title: string = 'app';
  lat: number = 33.7490;
  lng: number = -84.3880;
  zoom: number = 12;
  categories: string[];
  startDate: Date;
  endDate: Date;
  address: string;
  lat_term: number;
  lng_term: number;
  radius_term: string;
  filterOptions: any;
  userFound: boolean;
  iconPath: string;

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
              private router: Router,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.firebaseAuth.authState.subscribe((auth) => {
      this.events$ = this.eventManagerService.getCollection$();
      if (auth) {
        this.uid = auth.uid;
        this.userFound = true;
        this.linkRef = this.afs.doc(`users/${this.uid}`);
        this.user$ = this.linkRef.valueChanges();
        this.user$.subscribe(user => {
          if (user.filterOptions) {
            this.filterOptions = user.filterOptions;
            // Update filter options to display
            this.categories = user.filterOptions.categoriesSelected;
            this.startDate = user.filterOptions.startDate;
            this.endDate = user.filterOptions.endDate;
            this.address = user.filterOptions.address;
            this.radius_term = user.filterOptions.radius_term;
          }
        });
      } else {
        this.userFound = false;
      }
    });
  }

    // Seems as though need to be able to use values in the user.filterOptions
    // object to filter on the events in the events collection to then 
    // show as markers on the map

  getEvents() {
    this.events$ = this.eventManagerService.getCollection$();
  }

  getEventIcon(category: string) {
    switch(category) { 
      case 'humanitarian': { 
          this.iconPath = 'assets/shopping-mall.svg';
          break; 
      } 
      case 'environmental': { 
          this.iconPath = 'assets/campground.svg';
          break; 
      } 
      case 'animals': {
          this.iconPath = 'assets/pet-store.svg';
          break;
      }
      case 'education': {
          this.iconPath = 'assets/school.svg';
          break;
      }
      default: { 
          break; 
      }
    }
    return this.iconPath;
  }

  openSignInDialog(): void {
    let dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '30em'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userFound = true;
      }
    });
  }

  openFilterDialog(): void {
    let filterDialogRef = this.dialog.open(FilterDialogComponent, {
      width: '30em',
      data: { userFilterOptions: this.filterOptions,
              userFound: this.userFound }
    });

    filterDialogRef.afterClosed().subscribe(filterOptions => {
      if (filterOptions) {
        // If user wants to save user options
        if (filterOptions.saveThisFilter) {
          delete filterOptions.saveThisFilter
          // TODO: update the returned filterobject to the user document
          this.userManagerService.update(this.uid, {filterOptions: filterOptions});
        }
        this.getEvents();
        // If user just wants to apply changes without saving to database
        this.filterOptions = filterOptions;
        this.categories = filterOptions.categoriesSelected;
        this.startDate = filterOptions.startDate;
        this.endDate = filterOptions.endDate;
        this.address = filterOptions.address;
        this.lat_term = filterOptions.lat;
        this.lng_term = filterOptions.lng;
        this.radius_term = filterOptions.radius_term;
      }
    });
  }

  openPostEventDialog(): void {
    let dialogRef = this.dialog.open(EventEditComponent, {
      width: '30em',
      data: {uid: this.uid}
    });
    
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openViewAllEventsDialog(): void {
    let dialogRef = this.dialog.open(ViewEventComponent, {
      height: '80%',
      width: '30em',
      data: {uid: this.uid}
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openChatView(): void {
    console.log("navigating to chatroom");
    this.router.navigate(['chat']);
  }

  showLogoutSnackBar() {
    this.snackBar.open("Signed Out", "Okay", {
      duration: 2500
    });
  }

  signOut() {
    this.authService.logout();
    this.user$ = null; // Need to assign null to the user observable
    this.showLogoutSnackBar();
  }
}