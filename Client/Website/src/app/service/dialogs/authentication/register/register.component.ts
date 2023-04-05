import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  first_name = "";
  last_name = "";
  email = 'clovis.prosacco@example.com';
  password = 'password';
  phone_number = 0;
  date_of_birth = ""
  validated_email = true;
  connection_error = false;
  loading = false;
  gender = 0;


  signUp(){

  }

  validateEmail() {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(this.email);

    return result;
  }
}
