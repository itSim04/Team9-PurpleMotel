import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse-rooms.component';
import { QuickAvailabilityModule } from 'src/app/components/room/quick-availability/quick-availability.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent
  ],
  imports: [
    CommonModule,
    QuickAvailabilityModule,
    NavBarModule
  ],
  exports: [
    BrowseRoomsComponent
  ]
})
export class BrowseRoomsModule { }
