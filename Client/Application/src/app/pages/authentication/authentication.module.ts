
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthenticationService } from 'src/app/services/utility/authentication.service';

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
