import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationDialogService } from '../authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = "clovis.prosacco@example.comfhdfd";
  password = "fehfuhiuh";
  validated_email = true;
  constructor (private authentication_service: AuthenticationDialogService) {}


  login() {

    this.validated_email = this.validateEmail();
    
    if (this.validated_email) {

      this.authentication_service.login({
        email:'clovis.prosacco@example.com',
        password:'password2'
      }).subscribe(result => console.log(result))
    }
  }

  validateEmail() {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(this.email);

    return result;
  }

}

