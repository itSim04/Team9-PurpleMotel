import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { genders, parseDate, validateEmail, validatePassword } from '../authentication.utility';


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
  date_of_birth = new Date();
  validated_email = true;
  validated_password = true;
  connection_error = false;
  loading = false;
  gender = "2";
  password_match = true;

  final_page = false;

  constructor (private authentication_service: AuthenticationService, private toast_controller: ToastController) { }


  register() {

    this.connection_error = false;
    this.validated_email = validateEmail(this.email);
    this.validated_password = validatePassword(this.password);
    this.password_match = this.password === this.confirm_password;
    
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

          console.log(result);

        }, error: error => {

          this.loading = false;
          console.error(error);
          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

          } else {

            this.display_toast('Connection Error');

          }
        }
      });
    } else {

      this.display_toast('Invalid Information')

    }
  }

  get genders() {
    return genders;
  }

  async display_toast(body: string) {
    
    const toast = await this.toast_controller.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();

  }


}
