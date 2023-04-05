import { Component } from '@angular/core';
import { validateEmail } from '../authentication.utility';
import { AuthenticationDialogService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';


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
  confirm_password = "";
  phone_number = "";
  date_of_birth = ""
  validated_email = true;
  connection_error = false;
  loading = false;
  gender = "";
 
  constructor(private authentication_service: AuthenticationDialogService, private dialogRef: MatDialogRef<RegisterComponent>){}

  register() {

    this.connection_error = false;
    this.validated_email = validateEmail(this.email);
    this.loading = true;
    if (this.validated_email) {

      this.authentication_service.register({
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: Number.parseInt(this.gender),
        date_of_birth: this.date_of_birth,
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

  
}
