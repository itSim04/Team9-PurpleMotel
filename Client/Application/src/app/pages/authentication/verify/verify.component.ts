import { AuthenticationService } from './../../../services/utility/authentication.service';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { genders, parseDate, validateEmail, validatePassword } from '../authentication.utility';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  email = "";
  loading = false;
  verification = '';
  connection_error = false;

  constructor (private authentication_service: AuthenticationService, private toast_controller: ToastController, private router: Router) { }

  parseDate(date: Date) {

    return parseDate(date);

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 250);

  }

  send() {

    this.connection_error = false;


    this.loading = true;
    this.authentication_service.saveEmailVerificationCode(this.email).subscribe({

      next: result => {

        this.displayToast('Verification code sent');

      }, error: error => {

        this.loading = false;
        console.error(error);

        this.displayToast('Connection Error');

      }
    });

  }
  verify() {

    this.connection_error = false;


    this.loading = true;
    this.authentication_service.verifyEmail(this.verification).subscribe({

      next: result => {

        this.router.navigate(['/home']);

      }, error: error => {

        this.loading = false;
        console.error(error);

        this.displayToast('Incorrect Verification');


      }
    });

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
