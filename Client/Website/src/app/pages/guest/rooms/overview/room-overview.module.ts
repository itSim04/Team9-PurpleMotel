import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { RoomOverviewComponent } from './room-overview.component';
import { RoomDetailsModule } from 'src/app/components/room/room-details/room-details.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { CalendarModule } from 'src/app/components/room/calendar/calendar.module';



@NgModule({
  declarations: [
    RoomOverviewComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    RoomDetailsModule,
    CalendarModule,
    MatProgressBarModule
  ]
})
export class RoomOverviewModule { }
