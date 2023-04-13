import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule
  ],
  exports: [
    MenuComponent
  ]
})
export class RestaurantModule { }
