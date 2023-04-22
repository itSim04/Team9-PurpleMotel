import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { RoomModalModule } from 'src/app/components/room/room-modal/room-modal.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RoomItemModule,
    RoomModalModule
    

  ],
  exports: [
    BrowseRoomsComponent
  ]
})
export class RoomsModule { }
