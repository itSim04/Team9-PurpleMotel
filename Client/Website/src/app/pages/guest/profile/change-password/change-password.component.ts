import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UserDatabaseService } from 'src/app/pages/admin/user-database/user-database.service';
import { AuthenticationDialogService } from 'src/app/services/dialogs/authentication/authentication.service';
import { validatePassword } from 'src/app/services/dialogs/authentication/authentication.utility';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  old_password="12345";
  new_password="123456";
  confirm_new_password="123456";
  validated_old_password = true;
  validated_new_password = true;
  connection_error = false;
  loading = false;
  password_match = true;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>, private userDatabaseService: UserDatabaseService, private authentication_service: AuthenticationDialogService){}
  
  reset()
  
  {
    this.connection_error = false;
    this.validated_new_password=validatePassword(this.new_password);
    this.password_match = this.new_password === this.confirm_new_password;

    if (this.password_match && this.validated_new_password) {

      this.loading = true;
      const user_id = localStorage.getItem('id');
      const first_name = (JSON.parse(localStorage.getItem('user') || '{}') as User).first_name;
      const last_name = (JSON.parse(localStorage.getItem('user') || '{}') as User).last_name;
      const email = (JSON.parse(localStorage.getItem('user') || '{}') as User).email;
      const tier = (JSON.parse(localStorage.getItem('user') || '{}') as User).tier;
      const type = (JSON.parse(localStorage.getItem('user') || '{}') as User).type;
      const language = (JSON.parse(localStorage.getItem('user') || '{}') as User).language;
      const date_of_birth = (JSON.parse(localStorage.getItem('user') || '{}') as User).date_of_birth;
      const phone = (JSON.parse(localStorage.getItem('user') || '{}') as User).phone;
      const gender = (JSON.parse(localStorage.getItem('user') || '{}') as User).gender;

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
        password: this.new_password,
        permissions: new Map<string, number>()
  
      };

      return this.userDatabaseService.modifyUser(user_id, updatedUser).subscribe({

        next: result => {

          this.dialogRef.close();
        
        }, error: error => {

          this.loading = false;
          console.error(error)

        }
      })
    }
  
  }
}





