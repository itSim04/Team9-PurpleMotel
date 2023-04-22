import { IonContent, IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModalComponent } from './room-modal.component';
import { CalendarModule } from '../calendar/calendar.module';



@NgModule({
  declarations: [
    RoomModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    CalendarModule,

  ],
  exports: [
    RoomModalComponent
  ]
})
export class RoomModalModule { }
