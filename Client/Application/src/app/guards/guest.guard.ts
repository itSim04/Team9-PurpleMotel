import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { extractUser, extractUserId } from '../components/database/database.component';
import { AuthenticationDialogService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router, private authentication: AuthenticationDialogService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = extractUser();
    const user_id = extractUserId();

    const id = String(route.paramMap.get("id"));

    if(user && user_id) {
    if (user.tier != '0') {

      this.router.navigate(['/adminchat/']);
      return false;

    } else if (id == user_id) {

    
      return true;

    } else {

      this.router.navigate([`/support/${user_id}`]);
      return true;

    }

  } else {

  this.router.navigate(['/auth/login']);
  return false;

}
  }
}