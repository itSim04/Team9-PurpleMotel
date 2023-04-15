import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/services/dialogs/authentication/login/login.component';
import { RegisterComponent } from 'src/app/services/dialogs/authentication/register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileDialogService {

  constructor(public dialog: MatDialog, private request: HttpClient) { }

  openDialog(type: 'edit_profile' | 'change_password') {

    let component: ComponentType<unknown>;

    switch (type) {

      case 'edit_profile':

        component = EditProfileComponent;
        break;

      case 'change_password':

        component = EditProfileComponent;
        break;

    }

    return this.dialog.open(component, {});
  }
}
