import { FoodDatabaseService } from './../../../admin/food-database/food-database.service';
import { FoodCategory } from './../../../../models/FoodCategory';
import { Food } from 'src/app/models/Food';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  foods: Map<string, Food> = new Map();
  food_categories: Map<string, FoodCategory> = new Map();

  constructor(private food_service: FoodDatabaseService) {}

  ngOnInit() {


    this.food_service.getAllFoods().subscribe(data => {

      this.foods = data.foods,
      this.food_categories = data.categories

    })

  }

}
