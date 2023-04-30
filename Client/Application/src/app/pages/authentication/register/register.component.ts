import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { genders, parseDate, validateEmail, validatePassword } from '../authentication.utility';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/utility/authentication.service';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  date_open = false;
  updateDate(s: Event) {

    this.date_of_birth = this.parseDate(new Date((s as CustomEvent).detail.value));

    this.date_open = false;

  }
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  confirm_password = "";
  phone_number = "";
  date_of_birth = '';
  validated_email = true;
  validated_password = true;
  connection_error = false;
  loading = false;
  gender = '';
  password_match = true;
  final_page = false;
  
  constructor (private authentication_service: AuthenticationService, private toast_controller: ToastController, private router: Router, private url:UrlBuilderService) { }
  
  register_bg = this.url.getImage('register-bg')
  parseDate(date: Date) {

    return parseDate(date);

  }

  extractConflicts2() {

    if (this.first_name.length <= 2) {

      return 'Invalid First Name';

    }
    if (this.last_name.length <= 2) {

      return 'Invalid Last Name';

    }
    if (this.gender) {

      return 'Gender field Missing';

    }
    if (!this.date_of_birth) {

      return 'Date of birth missing';

    }
    if (!this.isAdult(this.date_of_birth)) {

      return 'Ask an adult to make the account';
    }

    return undefined;


  }

  isAdult(birthday: string): boolean {
    const ageInMillis = Date.now() - Date.parse(birthday);
    const ageInYears = ageInMillis / (365 * 24 * 60 * 60 * 1000);
    return ageInYears >= 18;
  }

  extractConflicts() {

    if (validatePassword(this.password)) {

      return 'Weak Password';

    }
    if (this.password != this.confirm_password) {

      return 'Passwords should match';

    }
    if (this.phone_number.length <= 5) {

      return 'Invalid Phone Number';

    }
    if (!validateEmail(this.email)) {

      return 'Invalid Email';

    }
    return undefined;



  }

  next() {

    const conflicts = this.extractConflicts();

    if (conflicts) {

      this.displayToast(conflicts);

    } else {


      this.final_page = true;

    }
  }

  register() {

    this.connection_error = false;

    const conflicts = this.extractConflicts2();

    if (conflicts) {

      this.displayToast(conflicts);

    } else {

      this.loading = true;
      this.authentication_service.register({
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: Number.parseInt(this.gender),
        date_of_birth: parseDate(new Date(this.date_of_birth)),
        phone: this.phone_number

      }).subscribe({

        next: result => {

          this.router.navigate(['/auth/verify']);

        }, error: error => {

          this.loading = false;
          console.error(error);
          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

          } else {

            this.displayToast('Connection Error');

          }
        }
      });
    }
  }

  get genders() {
    return genders;
  }

  async displayToast(body: string) {

    const toast = await this.toast_controller.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();

  }


}
