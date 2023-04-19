import { Component, Input } from '@angular/core';
import { AuthenticationDialogService } from 'src/app/services/dialogs/authentication/authentication.service';
import { extractUser } from '../../database/database.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() transparent = false;
  @Input() hide_auth = false;
  constructor(private authentication_service: AuthenticationDialogService) { }


  login() {

    this.authentication_service.openDialog("login");

  }

  signUp() {
    this.authentication_service.openDialog("register")
  }

  get active() {

    if (!extractUser()) {

      return undefined
    } else {

      return (extractUser()?.first_name + " " + extractUser()?.last_name);

    }

  }

}
