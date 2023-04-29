import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FoodListPopupService } from "src/app/components/food/food-list-popup/food-list-popup.service";
import { Food } from "src/app/models/Food";
import { FoodCategory } from "src/app/models/FoodCategory";
import { Order } from "src/app/models/Order";
import { FoodDatabaseService } from "src/app/services/providers/food-database.service";
import { AuthenticationDialogService } from "src/app/services/utility/authentication.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  foods: Map<string, Food> = new Map();
  food_categories: Map<string, FoodCategory> = new Map();
  order?: Order;


  constructor(private food_service: FoodDatabaseService, private food_dialog: FoodListPopupService, /*private cart_dialog: CartDialogService,*/ private authentication: AuthenticationDialogService, private route: Router) {

    this.downloadCart();

  }

  ngOnInit() {

    this.food_service.getAllFoods().subscribe({
      next: data => {
        console.log(data);
        this.foods = data.foods;


        this.food_categories = data.categories;

      },

      error: error => {
        console.error(error);
      }
    });
  }

  scroll(search: string) {
    document.getElementById(search)?.scrollIntoView();

  }

  downloadCart() {

    const cart = localStorage.getItem('cart');

    if (cart) {

      this.order = (JSON.parse(cart) as Order);

    } else {

      this.order = undefined;

    }
  }

  getQuantity(arg0: string): number {

    if (this.order) {
      return this.order?.food.find(t => t.id == arg0)?.quantity || 0;
    } else {
      return 0;

    }

  }
}
