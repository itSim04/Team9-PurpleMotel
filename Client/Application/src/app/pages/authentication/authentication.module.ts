import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule
  ],
  providers: [
    AuthenticationService,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthenticationModule { }
