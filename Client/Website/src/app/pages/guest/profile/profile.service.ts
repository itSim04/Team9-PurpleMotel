import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/services/dialogs/authentication/login/login.component';
import { RegisterComponent } from 'src/app/services/dialogs/authentication/register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { User, UserInformation, UserResponse } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { UserDatabaseService } from '../../admin/user-database/user-database.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileDialogService {

  constructor(public dialog: MatDialog, private request: HttpClient, private userDatabaseService: UserDatabaseService) { }

  openDialog(type: 'edit_profile' | 'change_password') {

    let component: ComponentType<unknown>;

    switch (type) {

      case 'edit_profile':

        component = EditProfileComponent;
        break;

      case 'change_password':

        component = EditProfileComponent;
        break;

    }

    return this.dialog.open(component, {});
  }

  edit_profile(
    email: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    phone: string,
    gender: string,

  ) {
    const user_id = localStorage.getItem('id');
    const tier = (JSON.parse(localStorage.getItem('user')|| '{}') as User).tier;
    const type = (JSON.parse(localStorage.getItem('user')|| '{}') as User).type;
    const language = (JSON.parse(localStorage.getItem('user')|| '{}') as User).language;


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
  

}
