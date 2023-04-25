import { Stock } from './Stock';
import { Ingredient, IngredientAttributes } from './Ingredient';
import { FoodCategory, FoodCategoryAttributes } from './FoodCategory';
import { KeyValue } from '@angular/common';
export interface Food extends FoodAttributes {

  category: string,
  ingredients: {
    id: string,
    quantity: number,
    required: boolean;
  }[], //The ingredients constituting the food
  image: string,

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
    id: string,
    type: 'Foods',
    attributes: FoodAttributes,
    relationships: {
      food_category: {
        data: {
          id: string,
          type: 'Food_Category';
        };
      };
    };
  }[],
  images: {

    food: {

      [id: string]: string[];

    };
    food_categories: {

      [id: string]: string[];

    };

  };

  included?: {


    id: string,
    type: 'FoodCategory' | 'Ingredient' | 'Stocks',
    attributes: FoodCategoryAttributes | IngredientAttributes | Stock,
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
    attributes: FoodAttributes;
    relationships: {
      food_category: {
        data: {
          id: string,
          type: 'Food_Category';
        };
      };
    };
  };
  images: {

    food: {

      [id: string]: string[];
    };
    food_categories: {

      [id: string]: string[];
    };

  };
}

export interface FoodPackage {
  food: KeyValue<string, Food>;
}

export interface FoodsPackage {
  foods: Map<string, Food>;
  stocks: Map<string, Stock>;
  ingredients: Map<string, Ingredient>;
  categories: Map<string, FoodCategory>;
}

