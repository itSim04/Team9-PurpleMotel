import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDatabaseComponent } from './order-database.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    OrderDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    OrderDatabaseComponent
  ]
})
export class OrderDatabaseModule { }
