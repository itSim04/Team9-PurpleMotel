import { CarouselModule } from './../../general/carousel/carousel.module';
import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from './room-details.component';
import { StarRatingModule } from 'angular-star-rating';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalendarModule } from '../calendar/calendar.module';



@NgModule({
  declarations: [
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    StarRatingModule,
    MatDividerModule,
    CalendarModule,
    MatProgressSpinnerModule,
    LanguageModule,
    CarouselModule
  ],
  exports: [
    RoomDetailsComponent
  ]
})
export class RoomDetailsModule { }
