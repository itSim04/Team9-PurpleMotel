import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { validatePassword } from 'src/app/pages/authentication/authentication.utility';
import { AuthenticationService } from 'src/app/services/utility/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  old_password = "12345";
  new_password = "123456";
  confirm_new_password = "123456";
  validated_old_password = true;
  validated_new_password = true;
  connection_error = false;
  loading = false;
  password_match = true;

  constructor (private authentication_service: AuthenticationService, private router: Router, private toast_controller: ToastController) { }

  reset() {
    this.connection_error = false;
    this.validated_new_password = validatePassword(this.new_password);
    this.password_match = this.new_password === this.confirm_new_password;

    if (this.password_match && this.validated_new_password) {

      this.loading = true;
      this.authentication_service.resetPassword(this.old_password, this.new_password, this.confirm_new_password).subscribe({

        next: result => {

          this.loading = false;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('token_time');
          this.router.navigate(['/auth']);

        }, error: error => {

          this.loading = false;
          if (error.status == 422) {

            this.displayToast("Invalid password")
            
          } else {
            
            this.displayToast("Connection error")

          }
          console.log(error);

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






