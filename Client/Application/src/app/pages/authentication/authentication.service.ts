import { ComponentType } from "@angular/cdk/portal";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs";
import { UserCredentials, UserResponse, UserInformation } from "src/app/models/User";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
}
