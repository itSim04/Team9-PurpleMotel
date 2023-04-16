import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserDatabaseService } from 'src/app/pages/admin/user-database/user-database.service';
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

  constructor(private userDatabaseService: UserDatabaseService) { }


  confirm_changes(
    email: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    phone: string,
    gender: string,
  ) {
    const user_id = localStorage.getItem('id');
    const tier = (JSON.parse(localStorage.getItem('user') || '{}') as User).tier;
    const type = (JSON.parse(localStorage.getItem('user') || '{}') as User).type;
    const language = (JSON.parse(localStorage.getItem('user') || '{}') as User).language;


    if (!user_id) {
      throw new Error('User ID not found');
    }

    const updatedUser: User = {
      tier,
      language,
      type,
      email,
      first_name,
      last_name,
      date_of_birth,
      phone,
      gender,
      permissions: new Map<string, number>()

    };

    return this.userDatabaseService.modifyUser(user_id, updatedUser);
  }


  get genders() {
    return genders;
  }
}
