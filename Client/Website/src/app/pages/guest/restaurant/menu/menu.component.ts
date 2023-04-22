import { Route, Router } from '@angular/router';
import { AuthenticationDialogService } from './../../../../services/utility/authentication.service';
import { extractUser } from 'src/app/components/database/database.component';
import { FoodCategory } from './../../../../models/FoodCategory';
import { Food } from 'src/app/models/Food';
import { Component, ViewChild } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Order } from 'src/app/models/Order';
import { FoodListPopupService } from 'src/app/components/food/food-list-popup/food-list-popup.service';
import { FoodDatabaseService } from 'src/app/services/providers/food-database.service';
import { CartDialogService } from 'src/app/services/utility/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  scroll(search: string) {
    document.getElementById(search)?.scrollIntoView();

  }

  foods: Map<string, Food> = new Map();
  food_categories: Map<string, FoodCategory> = new Map();
  order?: Order;

  constructor (private food_service: FoodDatabaseService, private food_dialog: FoodListPopupService, private cart_dialog: CartDialogService, private authentication: AuthenticationDialogService, private route: Router) {

    this.downloadCart();

  }

  getQuantity(arg0: string): number {

    if (this.order) {
      return this.order?.food.find(t => t.id == arg0)?.quantity || 0;
    } else {
      return 0;

    }

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

    if (extractUser()) {


      const dialogRef = this.cart_dialog.openDialog({ food: this.foods });
      dialogRef.afterClosed().subscribe(data => {

        if (data) this.route.navigate(['/profile']);
      });

    } else {

      this.authentication.openDialog('login');

    }
  }

}
