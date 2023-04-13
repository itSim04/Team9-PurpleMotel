import { RouterModule } from '@angular/router';
import { LanguageModule } from './../../../services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantLandingComponent } from './landing/landing-restaurant.component';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    MenuComponent,
    RestaurantLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavBarModule,
    FooterModule,
    LanguageModule
  ],
  exports: [
    MenuComponent,
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
