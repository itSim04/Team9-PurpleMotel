import { FoodDatabaseComponent } from './food-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FoodDatabaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FoodDatabaseComponent
  ]
})
export class FoodDatabaseModule { }
