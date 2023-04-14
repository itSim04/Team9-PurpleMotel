import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { ProfileComponent } from './profile.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingDetailsModule } from './booking-details/booking-details.module';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityDetailsModule } from './activity-details/activity-details.module';





@NgModule({
  declarations: [
    ProfileComponent,
    BookingDetailsComponent,
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    LanguageModule,
    BookingDetailsModule,
    ActivityDetailsModule
   
  ]
})
export class ProfileModule { }
