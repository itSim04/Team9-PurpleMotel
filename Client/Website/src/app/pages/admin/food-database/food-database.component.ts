import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DataInjection } from 'src/app/models/Database';
import { FoodDatabaseService } from './food-database.service';
import { Food } from 'src/app/models/Food';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.scss']
})
export class FoodDatabaseComponent {

  constructor (private food_service: FoodDatabaseService) { }

  data_injection: DataInjection<Food> = {

    title: 'Foods',
    displayed_columns: [
      {
        key: 'label'
      },
      {
        key: 'description'
      },
      {
        key: 'price'
      },
      {
        key: 'is_served', type:'boolean'
      }
    ],
    data_fetcher: () => this.food_service.getAllFoods().pipe(map(data => data.foods))

  };
}
