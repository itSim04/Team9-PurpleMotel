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
  constructor () { }

  validateEmail() {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(this.email); // true

    return result;
  }

}

