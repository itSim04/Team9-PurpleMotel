import { Component, OnInit } from "@angular/core";
import { Food } from "src/app/models/Food";
import { FoodDatabaseService } from "src/app/services/providers/food-database.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  foods: Map<string, Food> = new Map();
  foods_array: [string, Food][] = [];

  constructor(private food_service: FoodDatabaseService) { }

  ngOnInit() {

    this.food_service.getAllFoods().subscribe({next: data => {
        //console.log(data);
        this.foods = data.foods;
        this.foods_array = Array.from(this.foods);
      },
      
      error: error => {
        console.error(error);
      }
    });
    //console.log(this.foods)
  }
}
