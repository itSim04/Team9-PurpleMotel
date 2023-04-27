import { Component } from '@angular/core';
import { validateEmail } from '../authentication.utility';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/utility/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';
  validated_email = true;
  validated_credentials = true;
  connection_error = false;
  loading = false;
  constructor (private toastController: ToastController, private authentication_service: AuthenticationService, private router: Router) { }



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
          this.router.navigate(['/home'])

        }, error: error => {

          console.error(error)
          this.loading = false;

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.validated_credentials = false;

            this.display_toast('Incorrect Credentials')
            
          } else {
            
            this.display_toast('Connection Error')
            this.connection_error = true;

          }
        }
      });
    } else {

      this.display_toast('Invalid Email')
      
    }
  }
  
  async display_toast(body: string) {
    
    const toast = await this.toastController.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();

  }

}

