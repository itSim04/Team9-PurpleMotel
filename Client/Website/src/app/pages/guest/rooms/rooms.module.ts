import { QuickAvailabilityModule } from './../../../components/room/quick-availability/quick-availability.module';
import { PaginatorModule } from './../../../components/general/paginator/paginator.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { RoomDetailsModule } from './../../../components/room/room-details/room-details.module';
import { RoomDetailsComponent } from './../../../components/room/room-details/room-details.component';
import { RoomOverviewComponent } from './overview/room-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse/browse-rooms.component';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent,
    RoomOverviewComponent,
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    RoomDetailsModule,
    RoomItemModule,
    MatDividerModule,
    PaginatorModule,
    QuickAvailabilityModule
  ],
  exports: [
    BrowseRoomsComponent,
    RoomOverviewComponent
  ]
})
export class RoomsModule { }
