import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class CanEditGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.auth.user.pipe(
      take(1),
      map(user => user && user.roles.editor ? true : false), //<-- important line
      tap(isEditor => {
        if (!isEditor) {
          //could instead use router to redirect instead of printing error
          console.error('Access Denied. Editors Only!');
        }
      })
    );
  }
}
