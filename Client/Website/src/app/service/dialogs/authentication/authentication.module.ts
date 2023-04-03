import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import {MatDialogModule } from '@angular/material/dialog';



@NgModule({
  
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    AuthenticationDialogService
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
