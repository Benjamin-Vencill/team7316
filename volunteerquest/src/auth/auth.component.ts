import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireModule} from 'angularfire2/';

@Component({ 
    selector: 'auth-view',
    providers: [AngularFireModule, AuthService],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'] 
})


export class AuthComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }
}