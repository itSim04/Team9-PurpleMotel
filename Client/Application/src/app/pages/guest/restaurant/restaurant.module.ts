import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantLandingComponent } from './landing/landing-restaurant.component';



@NgModule({
  declarations: [
    RestaurantLandingComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
