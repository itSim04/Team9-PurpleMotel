import { ComponentType } from '@angular/cdk/portal';
import { RegisterComponent } from './register/register.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { UserCredentials, UserResponse, UserInformation } from 'src/app/models/User';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationDialogService {

  constructor (public dialog: MatDialog, private request: HttpClient) { }

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

  login(user: UserCredentials) {


    return this.request.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/login", user).pipe(

      map(result => {

        if (result.authorisation) {

          localStorage.setItem('token', result.authorisation.token);
          localStorage.setItem('user', JSON.stringify(result.data.attributes));
          if (result.permissions) localStorage.setItem('permissions', JSON.stringify(result.permissions));
        }

        return;

      })


    );
  }
  register(user: UserInformation) {


    return this.request.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/register", user).pipe(

      map(result => {

        if (result.authorisation) {

          localStorage.setItem('token', result.authorisation.token);
          localStorage.setItem('user', JSON.stringify(result.data.attributes));

        }
        return;

      })


    );
  }
}
