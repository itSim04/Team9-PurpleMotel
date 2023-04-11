import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from './room-details.component';
import { StarRatingModule } from 'angular-star-rating';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    StarRatingModule,
    MatDividerModule
  ],
  exports: [
    RoomDetailsComponent
  ]
})
export class RoomDetailsModule { }
