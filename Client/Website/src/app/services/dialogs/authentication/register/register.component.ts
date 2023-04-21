import { Component } from '@angular/core';
import { genders, parseDate, validateEmail, validatePassword } from '../authentication.utility';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  first_name = "charbel";
  last_name = "gerges";
  email = "charfbe@ex.com";
  password = "chacA$4ds";
  confirm_password = "chacA$4ds";
  phone_number = "12213";
  date_of_birth = new Date();
  validated_email = true;
  validated_password = true;
  connection_error = false;
  loading = false;
  gender = "2";
  password_match = true;

  constructor(private authentication_service: AuthenticationDialogService, private dialogRef: MatDialogRef<RegisterComponent>){}

  register() {

    this.connection_error = false;
    this.validated_email = validateEmail(this.email);
    this.validated_password = validatePassword(this.password);
    this.password_match = this.password === this.confirm_password;
    console.log(parseDate(this.date_of_birth))
    if (this.validated_email && this.password_match && this.validated_password) {
      this.loading = true;
      this.authentication_service.register({
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: Number.parseInt(this.gender),
        date_of_birth: parseDate(this.date_of_birth),
        phone: this.phone_number

      }).subscribe({

        next: result => {

          this.dialogRef.close();
        
        }, error: error => {

          this.loading = false;
          console.error(error)
          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

          } else {

            this.connection_error = true;

          }
        }
      })
    }
  }

  get genders(){
    return genders;
  }

  goToLogin(){
    this.dialogRef.close();
    this.authentication_service.openDialog('login');
  }

  
}
