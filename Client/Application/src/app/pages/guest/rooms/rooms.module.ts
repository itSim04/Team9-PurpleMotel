import { FormsModule } from '@angular/forms';
import { RecommendModalComponent } from './recommend/recommend.component';
import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { ProfileModule } from '../profile/profile.module';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { CalendarWrapperModule } from 'src/app/components/room/calendar/calendar.module';
import { QuickAvailabilityModalComponent } from './quick-availability/quick-availability.component';




@NgModule({
  declarations: [
    BrowseRoomsComponent,
    RoomModalComponent,
    QuickAvailabilityModalComponent,
    RecommendModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
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
