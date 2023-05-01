import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { validateEmail } from '../authentication.utility';
import { extractUser } from 'src/app/components/database/database.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  email = 'clovis.prosacco@example.com';
  verification = '';
  validated_email = true;
  successful_email = false;

  connection_error = false;
  invalid_email = false;
  invalid_code = false;
  loading = false;
  
  constructor (private dialogRef: MatDialogRef<VerifyComponent>, private authentication_service: AuthenticationDialogService, private snackbar: MatSnackBar) { }


  verify() {

    this.connection_error = false;
    this.validated_email = validateEmail(this.email);
    this.invalid_email = false;
    this.loading = true;
    if (this.validated_email) {

      this.authentication_service.saveEmailVerificationCode(this.email).subscribe({

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

    this.authentication_service.verifyEmail(this.verification).subscribe({

      next: result => {

        this.successful_email = true;
        
        const user = extractUser()!;
        user.email_verified_at = new Date().toISOString();

        localStorage.setItem('user', JSON.stringify(user));
        
        // Toast to notify user that email has been verified
        this.snackbar.open('Email has been verified', 'Close', { duration: 3000 });
        this.dialogRef.close();




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

}

