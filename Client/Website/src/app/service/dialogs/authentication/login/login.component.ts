import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationDialogService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { validateEmail } from '../authentication.utility';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = 'clovis.prosacco@example.com';
  password = 'password';
  validated_email = true;
  validated_credentials = true;
  connection_error = false;
  loading = false;
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private authentication_service: AuthenticationDialogService) { }


  login() {

    this.connection_error = false;
    this.validated_credentials = true;
    this.validated_email = validateEmail(this.email);
    this.loading = true;
    if (this.validated_email) {

      this.authentication_service.login({
        email: this.email,
        password: this.password
      }).subscribe({

        next: result => {

          this.dialogRef.close();

        }, error: error => {

          this.loading = false;

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.validated_credentials = false;

          } else {

            this.connection_error = true;

          }
        }
      })
    }
  }
  goToRegister(){
    this.dialogRef.close();
    this.authentication_service.openDialog('register');
  }

}

