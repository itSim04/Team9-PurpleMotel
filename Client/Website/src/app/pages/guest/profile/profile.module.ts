import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivityDetailsModule } from "src/app/components/activities/activity-details/activity-details.module";
import { CarouselModule } from "src/app/components/general/carousel/carousel.module";
import { FooterModule } from "src/app/components/general/footer/footer.module";
import { NavBarModule } from "src/app/components/general/nav-bar/nav-bar.module";
import { BookingDetailsModule } from "src/app/components/room/booking-details/booking-details.module";
import { LanguageModule } from "src/app/services/language/language.module";
import { ProfileService } from "src/app/services/utility/profile.service";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileComponent } from "./profile.component";






@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    LanguageModule,
    BookingDetailsModule,
    ActivityDetailsModule,
    CarouselModule
   
  ],
  exports: [
    EditProfileComponent,
    ChangePasswordComponent,
    ProfileComponent
  ],
  providers: [
    ProfileService
  ]
  
})
export class ProfileModule { }
