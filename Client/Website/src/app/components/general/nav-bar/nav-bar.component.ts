import { Component, Input } from '@angular/core';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { extractUser } from '../../database/database.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() transparent = false;
  @Input() hide_auth = false;
  constructor (private authentication_service: AuthenticationDialogService) { }


  login() {

    this.authentication_service.openDialog("login");

  }

  signUp() {
    this.authentication_service.openDialog("register");
  }

  get active() {

    const user = extractUser(false);
    if (!user) {

      return undefined;

    } else {

      return (user.first_name + " " + user.last_name);

    }

  }

}
