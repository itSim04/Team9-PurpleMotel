import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from './room-details.component';
// import { CalendarModule } from '../calendar/calendar.module';



@NgModule({
  declarations: [
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    // CalendarModule
  ],
  exports: [
    RoomDetailsComponent
  ]
})
export class RoomDetailsModule { }
