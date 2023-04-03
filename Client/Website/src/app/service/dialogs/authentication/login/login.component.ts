import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = "";
  password = "";
  validated_email = true;
  constructor (private http: HttpClient) {}


  login() {

    this.validated_email = this.validateEmail();
    
    if (this.validated_email) {

      //call to the api
    }
  }

  validateEmail() {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(this.email);

    return result;
  }

}

