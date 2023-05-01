import { MatDialogRef } from '@angular/material/dialog';
import { UserChange } from './../../../../models/User';
import { extractUser, extractPermission } from 'src/app/components/database/database.component';
import { extractUserId } from 'src/app/components/database/database.component';
import { UserAttributes, UserInformation } from 'src/app/models/User';
import { UserDatabaseService } from 'src/app/services/providers/user-database.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { areEqual, clone } from 'src/app/components/database/change/change.component';
import { parseDate, validateEmail, genders, validatePassword } from 'src/app/pages/authentication/authentication.utility';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  date_open = false;
  updateDate(s: Event) {

    this.user.date_of_birth = this.parseDate(new Date((s as CustomEvent).detail.value));

    this.date_open = false;

  }

  validated_email = true;
  connection_error = false;
  taken_information: boolean = false;
  loading = false;
  final_page = false;
  user: UserChange;
  old_user: UserChange;

  constructor (private router: Router, private toast_controller: ToastController, private user_service: UserDatabaseService) {

    const user = extractUser();

    if (user) {


      this.user = {

        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        date_of_birth: user.date_of_birth,
        gender: user.gender

      };

      this.old_user = {

        first_name: clone(user.first_name),
        last_name: clone(user.last_name),
        email: clone(user.email),
        phone: clone(user.phone),
        date_of_birth: clone(user.date_of_birth),
        gender: clone(user.gender)

      };



    } else {

      throw new Error('Unauthenticated user!');

    }

  }

  extractConflicts() {

    if (areEqual(this.user, this.old_user)) {

      return 'You did not change anything!';

    }
    if (this.user.phone.length <= 5) {

      return 'Invalid Phone Number';

    }
    if (!validateEmail(this.user.email)) {

      return 'Invalid Email';

    }
    if (this.user.first_name.length <= 2) {

      return 'Invalid First Name';

    }
    if (this.user.last_name.length <= 2) {

      return 'Invalid Last Name';

    }
    if (!this.user.gender) {

      return 'Gender field Missing';

    }
    if (!this.user.date_of_birth) {

      return 'Date of birth missing';

    }
    if (!this.isAdult(this.user.date_of_birth)) {

      return 'Ask an adult to make the account';
    }


    return undefined;



  }

  isAdult(birthday: string): boolean {
    const ageInMillis = Date.now() - Date.parse(birthday);
    const ageInYears = ageInMillis / (365 * 24 * 60 * 60 * 1000);
    return ageInYears >= 18;
  }


  next() {

    const conflicts = this.extractConflicts();

    if (conflicts) {

      this.displayToast(conflicts);

    } else {


      this.final_page = true;

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
  parseDate($event: any): string {

    return parseDate($event);

  }

  confirmChanges(user: UserChange) {

    const conflict = this.extractConflicts();



    if (!conflict) {

      this.user_service.editProfile(extractUserId()!, user).subscribe({

        next: user => {

          if (user) {

            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/profile']);

            setTimeout(() => {

              window.location.reload();
            }, 250);

          }

        },
        error: error => {

          console.error(error);

          if (error.status == 422) {

            this.taken_information = true;

          } else {

            this.connection_error = true;

          }
        }

      });
    } else {

      this.displayToast(conflict);

    }
  }


  get identical() {

    return areEqual(this.user, this.old_user);

  }

  get genders() {
    return genders;
  }
}
