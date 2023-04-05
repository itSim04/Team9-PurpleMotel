import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  phone_number = "";
  date_of_birth = ""
  validated_email = true;
  connection_error = false;
  loading = false;
  gender = "";


  signUp(){

  }

  
}
