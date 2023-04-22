import { ComponentType } from "@angular/cdk/portal";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs";
import { UserCredentials, UserResponse, UserInformation } from "./models/User";
import { LoginComponent } from "./pages/authentication/login/login.component";
import { RegisterComponent } from "./pages/authentication/register/register.component";
import { UrlBuilderService } from "./services/url-builder.service";




@Injectable({
  providedIn: 'root'
})
export class AuthenticationDialogService {

  constructor (public dialog: MatDialog, private http: HttpClient, private url: UrlBuilderService) { }

  openDialog(type: 'login' | 'register') 
   //'verify' | 'forgot-password'
   {

    let component: ComponentType<unknown>;

    switch (type) {

      case 'login':

        component = LoginComponent;
        break;

      case 'register':

        component = RegisterComponent;
        break;

      // case 'verify':

      //   component = VerifyComponent;
      //   break;

      // case 'forgot-password':

      //   component = ForgotPasswordComponent;
      //   break;

    }

    return this.dialog.open(component, {});
  }

  resetPassword(old_password: string, new_password: string, confirm_password: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post(this.url.generateUrl(`auth/reset-password`), { old_password: old_password, new_password: new_password, new_password_confirmation: confirm_password }, { headers: headers });

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }
  }

  login(user: UserCredentials) {


    return this.http.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/login", user).pipe(

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


    return this.http.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/register", user).pipe(

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

      return this.http.get<any>(`http://127.0.0.1:8000/api/v1/auth/forgot-password-1?email=${email}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  saveEmailVerificationCode(email: string) {

    try {

      return this.http.get<any>(`http://127.0.0.1:8000/api/v1/auth/send-verify-email?email=${email}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  verifyEmail(token: string) {

    try {

      return this.http.get<any>(`http://127.0.0.1:8000/api/v1/auth/verify-email?token=${token}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  forgotPassword(token: string, password: string, confirm_password: string) {

    try {

      return this.http.get<any>(`http://127.0.0.1:8000/api/v1/auth/forgot-password-2?password_confirmation=${confirm_password}&password=${password}&token=${token}`);

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}
