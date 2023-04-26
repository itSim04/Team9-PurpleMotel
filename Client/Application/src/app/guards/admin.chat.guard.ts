import { extractUserId } from 'src/app/components/database/database.component';
import { extractUser } from 'src/app/components/database/database.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminChatGuard implements CanActivate {

  constructor (private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = extractUser();
    const user_id = extractUserId();

    const id = String(route.paramMap.get("id"));

    console.log(user);
    if (user && user_id) {

      if (user.tier != '0') {
      
        return true;

      } else {

        this.router.navigate([`/chat/guest/${user_id}`]);
        return false;

      }
    } else {

      this.router.navigate(['/']);
      return false;

    }
  }

};
