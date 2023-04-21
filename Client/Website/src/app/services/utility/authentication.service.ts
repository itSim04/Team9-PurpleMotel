import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { UserCredentials, UserResponse, UserInformation } from 'src/app/models/User';
import { LoginComponent } from '../dialogs/authentication/login/login.component';
import { RegisterComponent } from '../dialogs/authentication/register/register.component';
import { VerifyComponent } from '../dialogs/authentication/verify/verify.component';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationDialogService {

  constructor (public dialog: MatDialog, private request: HttpClient) { }

  openDialog(type: 'login' | 'register' | 'verify') {

    let component: ComponentType<unknown>;

    switch (type) {

      case 'login':

        component = LoginComponent;
        break;

      case 'register':

        component = RegisterComponent;
        break;

      case 'verify':

        component = VerifyComponent;
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
          localStorage.setItem('id', result.data.id);
          localStorage.setItem('token_time', JSON.stringify(new Date()));
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

          localStorage.setItem('token_time', JSON.stringify(new Date()));
          localStorage.setItem('token', result.authorisation.token);
          localStorage.setItem('user', JSON.stringify(result.data.attributes));
          localStorage.setItem('id', result.data.id);

        }
        return;

      })


    );
  }

  savePasswordVerificationCode(email: string) {

    try {

      return this.request.get<any>(`http://127.0.0.1:8000/api/v1/auth/forgot-password-1?email=${email}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  saveEmailVerificationCode(email: string) {

    try {

      return this.request.get<any>(`http://127.0.0.1:8000/api/v1/auth/send-verify-email?email=${email}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  verifyEmail(token: string) {

    try {

      return this.request.get<any>(`http://127.0.0.1:8000/api/v1/auth/verify-email?token=${token}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}
