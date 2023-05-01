import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/models/Food';
import { CartDialogComponent } from '../dialogs/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(data: {food: Map<string, Food>}) {
    return this.dialog.open(CartDialogComponent, {data: data});
  }

}

