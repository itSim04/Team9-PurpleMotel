import { IonRatingStarsModule } from 'ion-rating-stars';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomItemComponent } from './room-item.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    IonRatingStarsModule,
    RouterModule
  ],
  exports: [
    RoomItemComponent
  ]
})
export class RoomItemModule { }
