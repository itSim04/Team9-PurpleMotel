import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import { LanguageModule } from '../../language/language.module';




@NgModule({
  
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    LanguageModule
  ],
  providers: [
    AuthenticationDialogService
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
