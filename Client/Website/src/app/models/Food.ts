import { Ingredient, IngredientAttributes } from './Ingredient';
import { FoodCategory } from './FoodCategory';
import { KeyValue } from '@angular/common';
export interface Food extends FoodAttributes {

  category: string,
  ingredients: number[], //The ingredients constituting the food

}

export interface FoodAttributes {
  label: string, //Name of the food
  description: string, //A detailed description
  price: number, //Price of the food
  is_served: boolean, //Is it currently served at the restaurant?
  // image_path: string; //Path of the image representing the food

}

export interface FoodsResponse {

  status: string,
  data: {
    id: 1,
    type: 'Foods',
    attributes: FoodAttributes,
    relationships: {
      food_category: {
        data: {
          id: number,
          type: 'Food_Category';
        };
      };
    };
  }[],

  included?: {


    id: string,
    type: 'FoodCategory' | 'Ingredient',
    attributes: FoodCategory | IngredientAttributes,
    relationships: {
      food: {
        data: {
          id: string,
          type: 'Food';
        };
      },
      stock: {
        data: {
          id: string,
          type: 'Stock';
        };
      };
    };
  }[];
}

export interface FoodResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Food;
  };
}

export interface FoodPackage {
  food: KeyValue<string, Food>;
}

export interface FoodsPackage {
  foods: Map<string, Food>;
  categories: Map<string, Ingredient>;
  ingredients: Map<string, FoodCategory>;
}

