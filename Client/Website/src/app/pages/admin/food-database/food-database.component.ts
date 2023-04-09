import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
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

    permission: 'food',
    title: 'Foods',
    displayed_columns: [
      {
        key: 'label'
      },
      {
        key: 'description'
      },
      {
        key: 'price',
        type: 'price'
      },
      {
        key: 'is_served', type: 'boolean'
      }
    ],
    data_fetcher: () => this.food_service.getAllFoods().pipe(map(data => [data.foods, undefined]))

  };

  change_injection: ChangeInjection<Food> = {

    side_panel: 'images',
    default_state: {
      label: '',
      description: '',
      price: 0,
      is_served: true,
      image_path: '',
      ingredients: []
    },

    //side_panel: 'empty',

    data_type: 'food',

    fields: [
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      },
      {
        key: 'price',
        type: 'number'
      },
      {
        key: 'ingredients',
        type: 'number'
      }
    ],

    toggle:
    {
      key: 'is_served',
      on_value: 'Is served',
      off_value: 'Is not served',
    },

    add_service: food => this.food_service.addNewFood(food),
    modify_service: (key, data) => this.food_service.modifyFood(key, data),
    delete_service: key => this.food_service.deleteFood(key),
    identifier: (data) => '' + data.label,
  };
}
