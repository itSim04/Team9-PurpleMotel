import { ProfileModule } from './../../../pages/guest/profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FoodListItemComponent } from './food-list-item.component';



@NgModule({
  declarations: [
    FoodListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfileModule
  ],
  exports: [
    FoodListItemComponent
  ]
})
export class FoodListItemModule { }
