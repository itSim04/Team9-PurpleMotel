import { LanguageModule } from 'src/app/services/language/language.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodListItemComponent } from '../food-list-item/food-list-item.component';
import { FoodListPopupComponent } from './food-list-popup.component';



@NgModule({
  declarations: [
    FoodListPopupComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    LanguageModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    FoodListPopupComponent
  ]
})
export class FoodListPopupModule { }
