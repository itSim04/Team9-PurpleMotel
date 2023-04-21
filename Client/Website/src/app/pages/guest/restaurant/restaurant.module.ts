import { OrderOverviewDialogModule } from './../../../services/dialogs/order-overview/order-overview.module';
import { FoodListPopupModule } from './../../../components/food/food-list-popup/food-list-popup.module';
import { CartDialogModule } from './../../../services/dialogs/cart/cart.module';
import { ChefListDialogModule } from './../../../services/dialogs/chef-list/chef-list.module';
import { FoodListItemModule } from './../../../components/food/food-list-item/food-list-item.module';
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
    LanguageModule,
    FoodListItemModule,
    FoodListPopupModule,
    ChefListDialogModule,
    CartDialogModule,
    OrderOverviewDialogModule
  ],
  exports: [
    MenuComponent,
    RestaurantLandingComponent
  ]
})
export class RestaurantModule { }
