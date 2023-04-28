import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { ProfileModule } from '../profile/profile.module';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { CalendarWrapperModule } from 'src/app/components/room/calendar/calendar.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent,
    RoomModalComponent

  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RoomItemModule,
    CalendarWrapperModule,
    ProfileModule,
    LanguageModule


  ],


  exports: [
    BrowseRoomsComponent
  ]
})
export class RoomsModule { }
