import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDatabaseComponent } from './order-database.component';



@NgModule({
  declarations: [
    OrderDatabaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderDatabaseComponent
  ]
})
export class OrderDatabaseModule { }
