import { RouterModule } from '@angular/router';
import { IonRatingStarsModule } from 'ion-rating-stars';
import { ReviewModalComponent } from './review/review.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LanguageModule } from "src/app/services/language/language.module";
import { ProfileService } from "src/app/services/utility/profile.service";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileComponent } from "./profile.component";
import { IonicModule } from "@ionic/angular";
import { ProfileModalComponent } from "./profile-modal/profile-modal.component";





@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ProfileModalComponent,
    ReviewModalComponent,
  ],
  imports: [
    CommonModule,
    LanguageModule,
    RouterModule,
    // BookingDetailsModule,
    // ActivityDetailsModule,
    FormsModule,
    IonRatingStarsModule,
    IonicModule.forRoot()
    
   
  ],
  exports: [
    EditProfileComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ProfileModalComponent
  ],
  providers: [
    ProfileService
  ]
  
})
export class ProfileModule { }
