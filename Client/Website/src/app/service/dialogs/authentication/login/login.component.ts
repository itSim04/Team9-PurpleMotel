import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationDialogService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private authentication_service: AuthenticationDialogService) { }


  login() {

    this.validated_email = this.validateEmail();

    if (this.validated_email) {

      this.authentication_service.login({
        email: this.email,
        password: this.password
      }).subscribe({

        next: result => {

          this.dialogRef.close();    

        }, error: error => {

          this.validated_credentials = false;

        }
      })
    }
  }

  validateEmail() {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(this.email);

    return result;
  }

}

