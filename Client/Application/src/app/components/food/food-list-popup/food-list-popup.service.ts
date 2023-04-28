import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodListPopupComponent } from './food-list-popup.component';
import { Image } from 'src/app/models/Image';

@Injectable({
  providedIn: 'root'
})
export class FoodListPopupService {

  constructor(public dialog: MatDialog) { }

  openDialog<T>(id: string, label:string, description: string, price:number, is_served: boolean, /*ingredients: string[], image: Image*/) {
    return this.dialog.open(FoodListPopupComponent, {
      data: {
        id: id,
        label: label,
        description: description,
        price: price,
        is_served: is_served,
        //ingredients: ingredients,
        //image: image
      }
    })
  }
}
