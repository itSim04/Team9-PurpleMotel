import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { validateEmail } from '../authentication.utility';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email = 'clovis.prosacco@example.com';
  verification = '';
  password = '';
  confirm_password = '';
  validated_email = true;
  successful_email = false;

  connection_error = false;
  invalid_email = false;
  invalid_code = false;
  loading = false;
  constructor (private dialogRef: MatDialogRef<ForgotPasswordComponent>, private authentication_service: AuthenticationDialogService, private snackbar: MatSnackBar) { }


  verify() {

    this.connection_error = false;
    this.validated_email = validateEmail(this.email);
    this.invalid_email = false;
    this.loading = true;
    if (this.validated_email) {

      this.authentication_service.savePasswordVerificationCode(this.email).subscribe({

        next: result => {

          this.successful_email = true;
          this.invalid_code = false;
          this.loading = false;


        }, error: error => {

          console.log(error);
          this.loading = false;

          if (error.status = 422) {

            this.invalid_email = true;

          } else {

            this.connection_error = true;

          }




        }
      });
    } else {

      this.loading = false;

    }
  }

  verify2() {

    this.connection_error = false;
    this.loading = true;

    this.authentication_service.forgotPassword(this.verification, this.password, this.confirm_password).subscribe({

      next: result => {

        this.successful_email = true;
        
        // Toast to notify user that email has been verified
        this.snackbar.open('Password has been reset', 'Close', { duration: 3000 });
        this.dialogRef.close();
        this.authentication_service.openDialog('login');




      }, error: error => {

        this.loading = false;

        if (error.status = 422) {

          this.invalid_code = true;

        } else {

          this.connection_error = true;

        }





      }
    });

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    this.dialogRef.close();


  }
  goToLogin() {
    this.dialogRef.close();
    this.authentication_service.openDialog('login');
  }

}

