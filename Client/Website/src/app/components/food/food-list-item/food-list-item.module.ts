import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodListItemComponent } from './food-list-item.component';



@NgModule({
  declarations: [
    FoodListItemComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    FoodListItemComponent
  ]
})
export class FoodListItemModule { }
