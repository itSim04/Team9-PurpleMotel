import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms.component';
import { QuickAvailabilityModule } from 'src/app/components/room/quick-availability/quick-availability.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { RoomItemModule } from 'src/app/components/room/room-item/room-item.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent
  ],
  imports: [
    CommonModule,
    QuickAvailabilityModule,
    NavBarModule,
    MatDividerModule,
    MatGridListModule,
    RoomItemModule
  ],
  exports: [
    BrowseRoomsComponent
  ]
})
export class BrowseRoomsModule { }
