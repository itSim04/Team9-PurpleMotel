import { ComponentType } from '@angular/cdk/portal';
import { RegisterComponent } from './register/register.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDialogService {

  constructor (public dialog: MatDialog) { }

  openDialog(type: 'login' | 'register') {

    let component: ComponentType<unknown>;
    
    switch (type) {

      case 'login':

        component = LoginComponent;
        break;

      case 'register':

        component = RegisterComponent;
        break;

    }

    return this.dialog.open(component, {});
  }
}

