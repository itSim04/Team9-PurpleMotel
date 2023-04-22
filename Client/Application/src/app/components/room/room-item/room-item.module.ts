import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomItemComponent } from './room-item.component';
// import { StarRatingModule } from 'angular-star-rating';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    // StarRatingModule,
    IonicModule.forRoot(),
    RouterModule
  ],
  exports: [
    RoomItemComponent
  ]
})
export class RoomItemModule { }
