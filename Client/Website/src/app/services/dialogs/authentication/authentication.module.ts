import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyComponent } from './verify/verify.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LanguageModule } from '../../language/language.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RegisterComponent } from './register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { AuthenticationDialogService } from '../../utility/authentication.service';


@NgModule({
  
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    LanguageModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule

  ],
  providers: [
    AuthenticationDialogService,
    
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ForgotPasswordComponent
  ]
})
export class AuthenticationModule { }
