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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ProfileDialogService } from './profile.service';
import { CarouselModule } from 'src/app/components/general/carousel/carousel.module';





@NgModule({
  declarations: [
    ProfileComponent,
    BookingDetailsComponent,
    ActivityDetailsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    LanguageModule,
    BookingDetailsModule,
    ActivityDetailsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    LanguageModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule,
    CarouselModule
   
  ],
  providers: [
    ProfileDialogService
  ]
  
})
export class ProfileModule { }
