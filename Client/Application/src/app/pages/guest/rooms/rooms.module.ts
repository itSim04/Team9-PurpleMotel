import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';



@NgModule({
  declarations: [
    BrowseRoomsComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RoomItemModule,
    

  ],
  exports: [
    BrowseRoomsComponent
  ]
})
export class RoomsModule { }
