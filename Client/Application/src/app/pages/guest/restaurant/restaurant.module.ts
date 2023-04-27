import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantLandingComponent } from './landing/landing-restaurant.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    RestaurantLandingComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule,
    RouterModule
  ],
  exports: [
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
