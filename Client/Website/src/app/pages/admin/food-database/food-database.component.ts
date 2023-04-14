import { Stock } from './../../../models/Stock';
import { Ingredient } from './../../../models/Ingredient';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { FoodDatabaseService } from './food-database.service';
import { Food } from 'src/app/models/Food';
import { FoodCategory } from 'src/app/models/FoodCategory';

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
        key: 'price',
        type: 'price'
      },
      {
        key: 'is_served', 
        type: 'boolean'
      },
      {
        key: 'category',
        type: 'link',
        link: {

          key: 'category',
          format: (value) => (value as FoodCategory)?.label

        }
      }
    ],
    data_fetcher: undefined

  };

  change_injection: ChangeInjection<Food> = {

    side_panel: 'images',
    default_state: {
      label: '',
      description: '',
      price: 0,
      is_served: true,
      category: '-1',
      ingredients: []
    },

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
        type: 'outer_choices',
        outer_choices: {

          index: 0,
          format: (choice) => (choice as Ingredient)?.stock_id,
          pivot_index: 1,
          pivot_format: (choice) => (choice as Stock)?.label

        }
      },
      {
        key: 'category',
        type: 'selection',
        choices: {

          link: true,
          format: (choice) => (choice as FoodCategory)?.label

        }
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

  extra_injection: DataInjection<FoodCategory> = {

    title: 'Food Category',
    permission: 'food_category',
    displayed_columns: [{

      key: 'label'

    }],
    data_fetcher: undefined

  }

  dual_fetcher: () => Observable<[Map<string, Food>, Map<string, FoodCategory>, Map<string, unknown>[]]> = () => this.food_service.getAllFoods().pipe(map(data => [data.foods, data.categories, [data.ingredients]]));
}
