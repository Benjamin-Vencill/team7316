import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { Validators } from '@angular/forms';
import 'rxjs/add/operator/map'
import * as firebase from 'firebase/app';
import 'hammerjs';


import { AuthService } from '../../auth/auth.service';
import { ConfirmDeleteAccountDialogComponent } from '../confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { EventManagerService } from '../../services/search-engine/event-manager.service';
import { User } from '../../auth/user';
import { UserManagerService } from '../../services/search-engine/user-manager.service';


@Component({
  selector: 'app-account',
  providers: [UserManagerService, 
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  templateUrl: './non-profit-account.component.html',
  styleUrls: ['./non-profit-account.component.css']
})
export class NonProfitAccountComponent implements OnInit {

  user$: Observable<User>;
  user: User;
  authUser: firebase.User;
  uid: string;
  userFound: boolean;
  private linkRef: AngularFirestoreDocument<User>;

  email_field = new FormControl('', [Validators.required, Validators.email]);
  isNonprofit: boolean = false;
  isVolunteer: boolean = false;
  firstName: string;
  lastName: string;
  phoneNumber: string = "";
  nonProfitName?: string = "";
  nonProfitDescription?: string = "";
  nonProfitAddress?: string = "";
  nonProfitCity?: string = "";
  nonProfitState?: string = "";
  nonProfitZipCode?: string = "";
  nonProfitWebURL?: string = "";
  status: string = "offline";
  hide: boolean = true;
  isEditEnabled = false;

  constructor(
              private firebaseAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private userManagerService: UserManagerService,
              private authService: AuthService,
              private router: Router,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>) { 


      this.firebaseAuth.authState.subscribe( auth => {
        if (auth !== undefined && auth !== null) {
          this.authUser = auth;
          this.uid = auth.uid;
          this.userFound = true;
          this.linkRef = this.afs.doc(`users/${this.uid}`);
          this.user$ = this.linkRef.valueChanges();
        } else {
          this.userFound = false;
        }
        this.getUser().valueChanges().subscribe(user => {
          this.user = user;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.phoneNumber = user.phoneNumber;
          this.nonProfitName = user.nonProfitName;
          this.nonProfitDescription = user.nonProfitDescription;
          this.nonProfitAddress = user.nonProfitAddress;
          this.nonProfitCity = user.nonProfitCity;
          this.nonProfitState = user.nonProfitState;
          this.nonProfitZipCode = user.nonProfitZipCode;
          this.nonProfitWebURL = user.nonProfitWebURL;
        });
      })
    }

  ngOnInit() {
  }

  getUser() {
    const userId = this.authUser.uid;
    const path = `users/${userId}`;
    return this.afs.doc<User>(path);
  }

  getErrorMessage() {
    return this.email_field.hasError('required') ? '' : 
      this.email_field.hasError('email') ? 'Not a valid email' : 
      '';
  }

  clearForm() {
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = "";
    this.nonProfitName = "";
    this.nonProfitDescription = "";
    this.nonProfitAddress = "";
    this.nonProfitCity = "";
    this.nonProfitState = "";
    this.nonProfitZipCode = "";
    this.nonProfitWebURL = "";

  }

  resetForm() {
    this.getUser().valueChanges().subscribe(user => {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phoneNumber = user.phoneNumber;
      this.nonProfitName = user.nonProfitName;
      this.nonProfitDescription = user.nonProfitDescription;
      this.nonProfitAddress = user.nonProfitAddress;
      this.nonProfitCity = user.nonProfitCity;
      this.nonProfitState = user.nonProfitState;
      this.nonProfitZipCode = user.nonProfitZipCode;
      this.nonProfitWebURL = user.nonProfitWebURL;
    });
  }

  nonProfitUpdate() {
    const updated_user: User = {
      uid: this.user.uid,
      email: this.user.email,
      firstName: this.firstName,
      lastName: this.lastName,
      roles: this.user.roles,
      filterOptions: this.user.filterOptions,
      nonProfitName: this.nonProfitName,
      nonProfitDescription: this.nonProfitDescription,
      nonProfitAddress: this.nonProfitAddress,
      nonProfitCity: this.nonProfitCity,
      nonProfitState: this.nonProfitState,
      nonProfitZipCode: this.nonProfitZipCode,
      nonProfitWebURL: this.nonProfitZipCode,
      phoneNumber: this.phoneNumber,
      status: this.user.status
    }
    console.log(updated_user);

    this.authService.setUserData(updated_user);
    this.snackBar.open("Updated " + this.user.email, '', {
      duration: 2500
    });
  }

  // First confirms with user if they would like to delete the event and then if confirmed, 
  // deletes the event
  deleteAccount() {
    let dialogRef = this.dialog.open(ConfirmDeleteAccountDialogComponent, {
      width: '30em',
      data: {
        email: this.user.email
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.userManagerService.remove(this.user.uid);
        this.snackBar.open("Deleted " + this.user.email, '', {
          duration: 2500
        });
        this.returnToMap();
        
      }
    })
  }


  returnToMap(): void {
    this.router.navigate(['mapview']);
  }

}
