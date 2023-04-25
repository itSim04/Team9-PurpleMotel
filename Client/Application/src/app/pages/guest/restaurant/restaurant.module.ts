import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantLandingComponent } from './landing/landing-restaurant.component';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    RestaurantLandingComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports: [
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
