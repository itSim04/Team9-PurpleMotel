import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import { LanguageModule } from '../../language/language.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RegisterComponent } from './register/register.component';



@NgModule({
  
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    LanguageModule,
    MatProgressBarModule
  ],
  providers: [
    AuthenticationDialogService
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule { }
