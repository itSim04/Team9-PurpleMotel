import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from './room-details.component';
import { CalendarModule } from '../calendar/calendar.module';



@NgModule({
  declarations: [
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    MatDividerModule,
    MatProgressSpinnerModule,
    CalendarModule,
  ],
  exports: [
    RoomDetailsComponent
  ]
})
export class RoomDetailsModule { }
