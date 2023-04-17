import { CartDialogService } from './../../../../services/dialogs/cart/cart.service';
import { FoodListPopupService } from './../../../../components/food/food-list-popup/food-list-popup.service';
import { FoodListPopupModule } from './../../../../components/food/food-list-popup/food-list-popup.module';
import { FoodDatabaseService } from './../../../admin/food-database/food-database.service';
import { FoodCategory } from './../../../../models/FoodCategory';
import { Food } from 'src/app/models/Food';
import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  getQuantity(arg0: string): number {

    return this.order?.food.find(t => t.id == arg0)?.quantity || 0;

  }

  foods: Map<string, Food> = new Map();
  food_categories: Map<string, FoodCategory> = new Map();
  order?: Order;

  constructor (private food_service: FoodDatabaseService, private food_dialog: FoodListPopupService, private cart_dialog: CartDialogService) {

    this.downloadCart();

  }

  downloadCart() {

    const cart = localStorage.getItem('cart');

    if (cart) {

      this.order = (JSON.parse(cart) as Order);

    } else {

      this.order = undefined;

    }
  }

  ngOnInit() {


    this.food_service.getAllFoods().subscribe(data => {

      this.foods = data.foods,
        this.food_categories = data.categories;

    });



  }

  invokeCart() {

    const dialogRef = this.cart_dialog.openDialog({ food: this.foods });
    dialogRef.afterClosed().subscribe(data => this.downloadCart());

  }

}
