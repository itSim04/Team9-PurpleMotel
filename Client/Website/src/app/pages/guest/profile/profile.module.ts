import { PromoDialogModule } from './../../../services/dialogs/promo/promo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { LanguageModule } from 'src/app/services/language/language.module';
import { BookingDetailsComponent } from '../../../components/room/booking-details/booking-details.component';
import { BookingDetailsModule } from '../../../components/room/booking-details/booking-details.module';
import { ActivityDetailsComponent } from '../../../components/activities/activity-details/activity-details.component';
import { ActivityDetailsModule } from '../../../components/activities/activity-details/activity-details.module';
import { CarouselModule } from 'src/app/components/general/carousel/carousel.module';
import { ProfileComponent } from './profile.component';





@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    LanguageModule,
    BookingDetailsModule,
    ActivityDetailsModule,
    CarouselModule,
    PromoDialogModule
   
  ]
  
})
export class ProfileModule { }
