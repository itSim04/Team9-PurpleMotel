import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomItemComponent } from './room-item.component';
// import { StarRatingModule } from 'angular-star-rating';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    // StarRatingModule,
    IonicModule.forRoot(),
    RouterModule,
    LanguageModule
  ],
  exports: [
    RoomItemComponent
  ]
})
export class RoomItemModule { }
