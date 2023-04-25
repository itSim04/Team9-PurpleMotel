import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { extractUser } from 'src/app/components/database/database.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

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

      if (user.email_verified_at) {

        return true;

      } else {

        this.authentication.openDialog('verify');
        return false;
        
      }
    } else {

      this.router.navigate(['/']);
      this.authentication.openDialog('login');
      return false;

    }

  }

}
