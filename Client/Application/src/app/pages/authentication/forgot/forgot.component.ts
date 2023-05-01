import { validatePassword } from 'src/app/pages/authentication/authentication.utility';
import { extractUser } from 'src/app/components/database/database.component';
import { AuthenticationService } from '../../../services/utility/authentication.service';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { parseDate } from '../authentication.utility';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  email = "";
  loading = false;
  verification = '';
  connection_error = false;

  password = '';
  confirm_password = '';

  constructor (private authentication_service: AuthenticationService, private toast_controller: ToastController, private router: Router) { }

  parseDate(date: Date) {

    return parseDate(date);

  }

  login() {


    this.router.navigate(['/auth/login']);


  }

  send() {

    this.connection_error = false;


    this.loading = true;
    this.authentication_service.savePasswordVerificationCode(this.email).subscribe({

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

    if (this.password != this.confirm_password) {

      this.displayToast('Passwords do not match');

    } else if (!validatePassword(this.password)) {

      this.displayToast('Password too weak');

    } else {

      this.authentication_service.forgotPassword(this.verification, this.password, this.confirm_password).subscribe({

        next: result => {


          setTimeout(() => {


            this.router.navigate(['/auth']);
          }, 250);


        }, error: error => {

          this.loading = false;
          console.error(error);

          this.displayToast('Incorrect Verification');


        }
      });

    }
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
