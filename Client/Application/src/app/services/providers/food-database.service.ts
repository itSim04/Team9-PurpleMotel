import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FoodsResponse, Food, FoodResponse, FoodPackage, FoodsPackage } from "src/app/models/Food";
import { UrlBuilderService } from "../utility/url-builder.service";
import { Stock } from 'src/app/models/Stock';
import { FoodCategory, FoodCategoryAttributes } from "src/app/models/FoodCategory";
import { Ingredient, IngredientAttributes } from "src/app/models/Ingredient";


@Injectable({
  providedIn: 'root'
})
export class FoodDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }


  getAllFoods(): Observable<FoodsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<FoodsResponse>(this.url.generateUrl('foods'), { headers: headers }).pipe(

        map((response: FoodsResponse): FoodsPackage => {

          if (response.included) {

            const foods = new Map<string, Food>();
            const food_categories = new Map<string, FoodCategory>();
            const ingredients = new Map<string, Ingredient>();
            const stocks = new Map<string, Stock>();
            const image = response.images;

            response.data.forEach(food => {

              foods.set(food.id, { ...food.attributes, ingredients: [], category: food.relationships.food_category.data.id, image: image.food[food.id][0] });

            });

            response.included.forEach(value => {


              switch (value.type) {


                case 'FoodCategory':

                  food_categories.set(value.id, { ...value.attributes as FoodCategoryAttributes, image: image.food_categories[value.id][0] });
                  break;

                case 'Ingredient':

                  ingredients.set(value.id, { ...(value.attributes as IngredientAttributes), food_id: value.relationships.food.data.id, stock_id: value.relationships.stock.data.id });
                  foods.get(value.relationships.food.data.id)?.ingredients.push({

                    id: value.relationships.stock.data.id,
                    quantity: (value.attributes as IngredientAttributes).quantity,
                    required: (value.attributes as IngredientAttributes).required

                  });

                  break;

                case 'Stocks':

                  stocks.set(value.id, value.attributes as Stock);

              }


            });



            return {

              foods: foods,
              categories: food_categories,
              ingredients: ingredients,
              stocks: stocks

            };

          }
          throw new Error("Foreign key constraint error");

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneFood(id: string): Observable<FoodPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<FoodResponse>(this.url.generateUrl(`foods/${id}`), { headers: headers }).pipe(
        map((response: FoodResponse): FoodPackage => {

          return {

            food: {

              key: response.data.id,
              value: {
                ...response.data.attributes,
                category: response.data.relationships.food_category.data.id,
                image: response.images.food[response.data.id][0],
                ingredients: []
              }

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  };

  addNewFood(food: Food) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<FoodResponse>(this.url.generateUrl('foods'), food, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyFood(food_id: string, food: Food) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`foods/${food_id}`), food, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteFood(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`foods/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  addNewFoodCategory(food: FoodCategoryAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<FoodResponse>(this.url.generateUrl('food-categories'), food, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyFoodCategory(food_id: string, food: FoodCategoryAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`food-categories/${food_id}`), food, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteFoodCategory(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`food-categories/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}