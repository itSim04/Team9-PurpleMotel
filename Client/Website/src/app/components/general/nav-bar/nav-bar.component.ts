import { Component } from '@angular/core';
import { AuthenticationDialogService } from 'src/app/service/dialogs/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private authentication_service: AuthenticationDialogService){}


  login(){

    this.authentication_service.openDialog("login");

  }
}
