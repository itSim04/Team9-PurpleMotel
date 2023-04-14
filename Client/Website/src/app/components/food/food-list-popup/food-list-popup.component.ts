import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/models/Order';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';

export interface FoodPopup {

  id: string;
  title: string,
  description: string;
  price: number;

  quantity: number;


}

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-popup.component.html',
  styleUrls: ['./food-list-popup.component.scss']
})
export class FoodListPopupComponent {

  id: string;
  name: string;
  description: string;
  price: number;
  quantity = 0;

  image = `../../../../assets/food-${Math.floor(Math.random() * 8) + 1}.jpg`;

  constructor (@Inject(MAT_DIALOG_DATA) public data: FoodPopup, private dialog: MatDialogRef<FoodListPopupComponent>) {
    this.name = data.title;
    this.description = data.description;
    this.price = data.price;
    this.id = data.id;
    this.quantity = data.quantity

  }


  get formatTotalPrice(): string {
    const numStr = (this.price * this.quantity).toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }

  get formatPrice(): string {
    const numStr = this.price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }

  changeQuantity(change: number) {

    this.quantity += change;

  }

  addToCart() {

    const cart = localStorage.getItem('cart');
    let item: Order;

    if (!cart) {

      item = {

        date: parseDate(new Date()),
        status: false,
        food: []

      };

    } else {

      item = JSON.parse(cart) as Order;

    }

    const temp = item.food.find(t => t.id == this.id);

    if (temp) {

      temp.quantity = this.quantity;

    } else {

      item.food.push({

        id: this.id,
        quantity: this.quantity

      });

    }

    localStorage.setItem('cart', JSON.stringify(item));

    this.dialog.close(this.quantity);

  }

}
