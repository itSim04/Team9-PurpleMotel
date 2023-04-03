import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogService } from './authentication.service';
import { LoginComponent } from './login/login.component';



@NgModule({
  
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationDialogService
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginDialogModule { }
