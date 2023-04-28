import { Component, OnInit } from "@angular/core";
import { Food } from "src/app/models/Food";
import { FoodCategory } from "src/app/models/FoodCategory";
import { FoodDatabaseService } from "src/app/services/providers/food-database.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  foods: Map<string, Food> = new Map();
  foods_array: [string, Food][] = [];

  food_categories: Map<string, FoodCategory> = new Map();
  food_catagories_array: [string, FoodCategory][] = [];

  constructor(private food_service: FoodDatabaseService) { }

  ngOnInit() {

    this.food_service.getAllFoods().subscribe({next: data => {
        console.log(data);
        this.foods = data.foods;
        this.foods_array = Array.from(this.foods);

        this.food_categories = data.categories;
        this.food_catagories_array = Array.from(this.food_categories);
      },
      
      error: error => {
        console.error(error);
      }
    });
  }

  scroll(search: string) {
    document.getElementById(search)?.scrollIntoView();

  }
}
