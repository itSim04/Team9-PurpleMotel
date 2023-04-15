import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse/browse-rooms.component';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { RoomOverviewComponent } from './overview/room-overview.component';
import { MatDividerModule } from '@angular/material/divider';
import { QuickAvailabilityModule } from 'src/app/components/room/quick-availability/quick-availability.module';
import { PaginatorModule } from 'src/app/components/general/paginator/paginator.module';
import { RoomItemModule } from 'src/app/components/room/room-item/room-item.module';
import { RoomDetailsModule } from 'src/app/components/room/room-details/room-details.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent,
    RoomOverviewComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    MatDividerModule,
    QuickAvailabilityModule,
    PaginatorModule,
    RoomItemModule,
    RoomDetailsModule
  ],
  exports: [
    BrowseRoomsComponent,
    RoomOverviewComponent
  ]
})
export class RoomsModule { }
