import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { validatePassword } from 'src/app/services/dialogs/authentication/authentication.utility';
import { UserDatabaseService } from 'src/app/services/providers/user-database.service';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  old_password = "12345";
  new_password = "123456";
  confirm_new_password = "123456";
  validated_old_password = true;
  validated_new_password = true;
  connection_error = false;
  loading = false;
  password_match = true;

  constructor (private dialogRef: MatDialogRef<ChangePasswordComponent>, private user_service: UserDatabaseService, private authentication_service: AuthenticationDialogService, private router: Router) { }

  reset() {
    this.connection_error = false;
    this.validated_new_password = true;//validatePassword(this.new_password);
    this.password_match = this.new_password === this.confirm_new_password;

    if (this.password_match && this.validated_new_password) {

      this.loading = true;
      this.authentication_service.resetPassword(this.old_password, this.new_password, this.confirm_new_password).subscribe({

        next: result => {

          this.loading = false;
          this.dialogRef.close();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('token_time');
          this.router.navigate(['/home']);
          this.authentication_service.openDialog('login');

        }, error: error => {

          this.loading = false;
          if (error.status == 422) {

            this.validated_old_password = false;

          } else {

            this.connection_error = true;

          }
          console.log(error);

        }

      });
         }

  }
}





