import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';




@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
