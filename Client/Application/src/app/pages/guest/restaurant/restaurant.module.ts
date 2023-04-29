import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantLandingComponent } from './landing/landing-restaurant.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FoodListItemModule } from 'src/app/components/food/food-list-item/food-list-item.module';



@NgModule({
  declarations: [
    RestaurantLandingComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule,
    RouterModule,
    FoodListItemModule
  ],
  exports: [
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
