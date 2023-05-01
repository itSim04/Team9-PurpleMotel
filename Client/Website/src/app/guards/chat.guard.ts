import { extractUserId } from 'src/app/components/database/database.component';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { extractUser } from 'src/app/components/database/database.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  constructor (private router: Router, private authentication: AuthenticationDialogService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = extractUser();
    const user_id = extractUserId();

    const id = String(route.paramMap.get("id"));

    if (user && user_id) {

      if (user.tier != '0') {

        this.router.navigate(['/adminchat/']);
        return false;

      } else if (id == user_id) {

        return true;

      } else {

        this.router.navigate([`/guestchat/${user_id}`]);
        return true;

      }
    } else {

      this.router.navigate(['/']);
      return false;

    }
  }

};
