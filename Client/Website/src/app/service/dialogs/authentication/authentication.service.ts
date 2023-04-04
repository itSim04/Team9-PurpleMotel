import { ComponentType } from '@angular/cdk/portal';
import { RegisterComponent } from './register/register.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../../../models/User';


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

  login(user: UserCredentials){
    
    this.request.post("http://127.0.0.1:8000/api/v1/auth/login",user).subscribe(result =>{
      console.log(result)
    })
  }
}

