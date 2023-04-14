import { Ingredient, IngredientAttributes } from './../../../models/Ingredient';
import { FoodCategory } from './../../../models/FoodCategory';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FoodsResponse, Food, FoodResponse, FoodPackage, FoodsPackage } from "src/app/models/Food";
import { UrlBuilderService } from "src/app/services/url-builder.service";
import { Stock } from 'src/app/models/Stock';


@Injectable({
  providedIn: 'root'
})
export class FoodDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }


  getAllFoods(): Observable<FoodsPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<FoodsResponse>(this.url.generateUrl('foods'), { headers: headers }).pipe(

        map((response: FoodsResponse): FoodsPackage => {

          if (response.included) {

            const foods = new Map<string, Food>();
            const food_categories = new Map<string, FoodCategory>();
            const ingredients = new Map<string, Ingredient>();
            const stocks = new Map<string, Stock>();

            response.data.forEach(food => {

              foods.set(food.id, { ...food.attributes, ingredients: [], category: food.relationships.food_category.data.id });

            });

            response.included.forEach(value => {

              console.log(value.type);
              switch (value.type) {


                case 'FoodCategory':

                  food_categories.set(value.id, value.attributes as FoodCategory);
                  break;

                case 'Ingredient':

                  ingredients.set(value.id, { ...(value.attributes as IngredientAttributes), food_id: value.relationships.food.data.id, stock_id: value.relationships.stock.data.id });
                  foods.get(value.relationships.food.data.id)?.ingredients.push(value.relationships.stock.data.id);

                  break;

                case 'Stocks':

                  stocks.set(value.id, value.attributes as Stock);

              }


            });

            console.log(food_categories, ingredients, stocks);

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

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<FoodResponse>(this.url.generateUrl(`foods/${id}`), { headers: headers }).pipe(
        map((response: FoodResponse): FoodPackage => {

          return {

            food: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewFood(food: Food) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.put(this.url.generateUrl(`foods/${food_id}`), food, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteFood(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.delete(this.url.generateUrl(`foods/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}