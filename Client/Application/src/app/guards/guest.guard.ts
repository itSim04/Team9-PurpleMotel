
import { extractUser } from 'src/app/components/database/database.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor (private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = extractUser();

    if (!localStorage.getItem('tutorial')) {

      this.router.navigate(['/tutorial']);
      return false;

    }
    if (user) {

      if (user.email_verified_at) {

        return true;

      } else {

        this.router.navigate(['auth/verify']);
        return false;

      }
    } else {

      this.router.navigate(['/auth']);
      return false;

    }

  }

}
