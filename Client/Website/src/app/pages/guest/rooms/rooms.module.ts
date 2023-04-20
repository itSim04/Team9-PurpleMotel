import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { FooterModule } from "src/app/components/general/footer/footer.module";
import { NavBarModule } from "src/app/components/general/nav-bar/nav-bar.module";
import { PaginatorModule } from "src/app/components/general/paginator/paginator.module";
import { QuickAvailabilityModule } from "src/app/components/room/quick-availability/quick-availability.module";
import { RoomDetailsModule } from "src/app/components/room/room-details/room-details.module";
import { RoomItemModule } from "src/app/components/room/room-item/room-item.module";
import { BrowseRoomsComponent } from "./browse/browse-rooms.component";
import { RoomOverviewComponent } from "./overview/room-overview.component";




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
    RoomDetailsModule,
    InfiniteScrollModule
  ],
  exports: [
    BrowseRoomsComponent,
    RoomOverviewComponent
  ]
})
export class RoomsModule { }
