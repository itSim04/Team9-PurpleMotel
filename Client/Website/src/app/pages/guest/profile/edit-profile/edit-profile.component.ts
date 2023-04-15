import { Component } from '@angular/core';
import { genders } from 'src/app/services/dialogs/authentication/authentication.utility';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  first_name = "charbel";
  last_name = "gerges";
  email = "charfbe@ex.com";
  phone_number = "12213";
  date_of_birth = new Date();
  validated_email = true;
  connection_error = false;
  loading = false;
  gender = "2";

  confirm_changes(){}

  get genders(){
    return genders;
  }
}
