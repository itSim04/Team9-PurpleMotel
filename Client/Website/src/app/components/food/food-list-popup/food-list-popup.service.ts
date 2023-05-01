import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodListPopupComponent } from './food-list-popup.component';

@Injectable({
  providedIn: 'root'
})
export class FoodListPopupService {


  constructor (public dialog: MatDialog) { }

  openDialog<T>(title: string, description: string, price: number, id:string, quantity: number, image: string) {

    return this.dialog.open(FoodListPopupComponent, {
      data: {
        title: title,
        description: description,
        price: price,
        id: id,
        image: image,
        quantity: quantity
      }
    });

  }

}

