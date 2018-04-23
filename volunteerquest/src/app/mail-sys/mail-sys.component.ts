import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EventManagerService } from '../services/search-engine/event-manager.service';
import { User } from '../auth/user';
import { UserManagerService } from '../services/search-engine/user-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-mail-sys',
  providers: [UserManagerService, 
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  templateUrl: './mail-sys.component.html',
  styleUrls: ['./mail-sys.component.css']
})
export class MailSysComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  authUser: firebase.User;
  uid: string;
  userFound: boolean;
  private linkRef: AngularFirestoreDocument<User>;
  user_email: string;
  firstName: string;
  lastName: string;
  mailTo: string;
  mailFrom: string;
  mailsubject: string;
  constructor(private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userManagerService: UserManagerService,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public mailDialogRef: MatDialogRef<MailSysComponent>) {

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
          this.mailFrom = "<" + user.firstName + " " + user.lastName + ">(" + user.email + "}";

          this.mailTo = user.mailTo;
          this.mailsubject = user.mailsubject;

        });
      })
     }

  ngOnInit() {
  }
  getUser(){
    const userId = this.authUser.uid;
    const path = `users/${userId}`;
    return this.afs.doc<User>(path);
  }
  pressedSend(){
    this.userManagerService.update(this.uid,{
    mailTo: "",
    mailsubject: ""});
    this.snackBar.open("Message sent", "", {
      duration: 2500
    });
  }

}
