import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.auth.user.pipe(
      take(1), // prevents a running subscription
      map(user => user && user.roles.admin ? true : false), //<-- important line, sees if user object exists, if so, check for admin property
      tap(isAdmin => { // console log an error if user is trying to access unauthorized area.
        if (!isAdmin) { // Locks down a route based on a user's role
          //could instead use router to redirect instead of printing error
          console.error('Access Denied. Admins Only!');
        }
      })
    );
  }
}
