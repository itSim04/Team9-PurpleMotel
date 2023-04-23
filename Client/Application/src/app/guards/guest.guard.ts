import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { extractUser } from '../components/database/database.component';
import { AuthenticationDialogService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor (private router: Router, private authentication: AuthenticationDialogService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = extractUser();
    if (user) {
      return true;
    } else {

      this.router.navigate(['/auth/login']);
      return false;

    }
  }
}