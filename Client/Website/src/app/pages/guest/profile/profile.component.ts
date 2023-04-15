import { Component, Input } from '@angular/core';
import { ProfileDialogService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private profile_service: ProfileDialogService) { }
  edit_profile() {

    this.profile_service.openDialog("edit_profile");

  }

  change_password() {

    this.profile_service.openDialog("change_password");

  }
  
}
