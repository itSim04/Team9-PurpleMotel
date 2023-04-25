import { Stock } from './../../../models/Stock';
import { Ingredient } from './../../../models/Ingredient';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Food } from 'src/app/models/Food';
import { FoodCategory, FoodCategoryAttributes } from 'src/app/models/FoodCategory';
import { FoodDatabaseService } from 'src/app/services/providers/food-database.service';
import { KeyValue } from '@angular/common';

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
          format: (value) => (value as FoodCategoryAttributes)?.label

        }
      }
    ],
    data_fetcher: undefined,
    hover_linker: {

      index: 1,
      key: 'ingredients',
      filter: (t1, t2) => !!(t2 as string[]).find(t => t == (t1 as string)),

      format: (data) => {

        return (data[1] as Stock)?.label;

      }

    }

  };

  change_injection: ChangeInjection<Food> = {

    table: {

      columns: [
        {

          key: 'id',
          type: 'selection',
          outer_link: {

            index: 1,
            format: (value) => (value as KeyValue<string, Stock>)?.value?.label,
            key: 'id'

          }

        },
        {

          key: 'quantity',
          type: 'text'

        },
        {
          key: 'required',
          type: 'boolean'
        }

      ],
      default_value: {

        id: '0',
        quantity: 0,
        required: false

      },
      key: 'ingredients'

    },
    side_panel: 'table',
    default_state: {
      image: '',
      label: '',
      description: '',
      price: 0,
      is_served: true,
      category: '-1',
      ingredients: []
    },

    data_type: 'Food',

    fields: [
      {
        key: 'image',
        type: 'image'
      },
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
        key: 'category',
        type: 'selection',
        choices: {

          link: true,
          format: (choice) => (choice as FoodCategoryAttributes)?.label,

        },
        condition: (choice) => choice != '-1'
      },
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

  };

  extra_change_injection: ChangeInjection<FoodCategory> = {

    data_type: 'Food Category',
    default_state: {

      image: '',
      label: '',

    },
    fields: [],
    standalone_field: {

      key: 'label',
      type: 'text'

    },
    side_panel: 'image',
    add_service: category => this.food_service.addNewFoodCategory(category),
    modify_service: (key, data) => this.food_service.modifyFoodCategory(key, data),
    delete_service: key => this.food_service.deleteFoodCategory(key),
    identifier: (data) => '' + data.label,

  };

  dual_fetcher: () => Observable<[Map<string, Food>, Map<string, FoodCategory>, Map<string, unknown>[]]> = () => this.food_service.getAllFoods().pipe(map(data => [data.foods, data.categories, [data.ingredients, data.stocks]]));

}
