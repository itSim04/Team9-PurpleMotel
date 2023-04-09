import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FoodsResponse, Food, FoodResponse, FoodPackage, FoodsPackage } from "src/app/models/Food";
import { UrlBuilderService } from "src/app/services/url-builder.service";


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

          const foods = new Map<string, Food>();

          response.data.forEach(food => {

            foods.set(food.id, food.attributes);

          });

          return {

            foods: foods

          };

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