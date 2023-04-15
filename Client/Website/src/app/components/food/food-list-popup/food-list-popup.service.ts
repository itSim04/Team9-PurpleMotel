import { FoodListItemComponent } from './../food-list-item/food-list-item.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodListPopupComponent } from './food-list-popup.component';

@Injectable({
  providedIn: 'root'
})
export class FoodListPopupService {


  constructor (public dialog: MatDialog) { }

  openDialog<T>(title: string, description: string, price: number, id:string, quantity: number) {

    return this.dialog.open(FoodListPopupComponent, {
      data: {
        title: title,
        description: description,
        price: price,
        id: id,
        quantity: quantity
      }
    });

  }

}

