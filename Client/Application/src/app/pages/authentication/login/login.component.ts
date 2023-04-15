import { AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { validateEmail } from '../authentication.utility';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = 'clovis.prosacco@example.com';
  password = 'password';
  validated_email = true;
  validated_credentials = true;
  connection_error = false;
  loading = false;
  constructor (private toastController: ToastController, private authentication_service: AuthenticationService) { }



  async login() {

    this.connection_error = false;
    this.validated_credentials = true;
    this.validated_email = validateEmail(this.email);
    this.loading = true;
    if (this.validated_email) {

      this.authentication_service.login({
        email: this.email,
        password: this.password
      }).subscribe({

        next: result => {

          console.log(result);

        }, error: error => {

          this.loading = false;

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.validated_credentials = false;

          } else {

            this.connection_error = true;

          }
        }
      });
    } else {

      const toast = await this.toastController.create({
        message: 'Hello World!',
        duration: 1500,
        position: 'bottom'
      });

      await toast.present();

    }
  }

}

