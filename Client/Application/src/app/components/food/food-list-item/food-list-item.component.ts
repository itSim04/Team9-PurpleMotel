import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { extractUserId } from '../../database/database.component';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
})
export class FoodListItemComponent  implements OnInit {

  @Input() food!: KeyValue<string, Food>;

  @Input() quantity = 0;

  constructor() {}

  ngOnInit() {}

  // addToCart() {

  //   const user_id = extractUserId();
  //   if (user_id) {
  //     const cart = localStorage.getItem('cart');
  //     let item: Order;

  //     if (!cart) {

  //       item = {

  //         user_id: user_id,
  //         date: parseDate(new Date()),
  //         status: '0',
  //         food: []

  //       };

  //     } else {

  //       item = JSON.parse(cart) as Order;

  //     }

  //     const temp = item.food.find(t => t.id == this.id);

  //     if (temp) {

  //       temp.quantity = this.quantity;

  //     } else {

  //       item.food.push({

  //         id: this.id,
  //         quantity: this.quantity

  //       });

  //     }

  //     localStorage.setItem('cart', JSON.stringify(item));

  //     this.dialog.close(this.quantity);
  //   } else {

  //     this.dialog.close(0);
  //     this.authentication.openDialog('login');

  //   }
  // }

}
