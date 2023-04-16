import { UserType } from 'src/app/models/UserType';
import { FoodAttributes } from './../../../models/Food';
import { User, UserAttributes } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrdersPackage, OrdersResponse, Order, OrderPackage, OrderResponse, OrderAttributes } from 'src/app/models/Order';
import { Food } from 'src/app/models/Food';
import { UrlBuilderService } from 'src/app/services/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllOrders(): Observable<OrdersPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<OrdersResponse>(this.url.generateUrl('orders'), { headers: headers }).pipe(


        map((response: OrdersResponse): OrdersPackage => {

          const orders = new Map<string, Order>();
          const foods = new Map<string, Food>();
          const users = new Map<string, User>();
          const user_types = new Map<string, UserType>();

          response.data.forEach(order => {

            orders.set(order.id, { ...order.attributes, food_id: order.relationships.food.data.id, user_id: order.relationships.user.data.id });

          });

          if (response.included) {

            response.included.forEach(value => {

              switch (value.type) {

                case 'Foods':

                  foods.set(value.id, { ...value.attributes } as Food);

                  break;

                case 'Users':

                  users.set(value.id, { ...value.attributes as UserAttributes, type: value.relationships.user_type.data.id, permissions: new Map() });

                  break;

                case 'UserTypes':

                  user_types.set(value.id, value.attributes as UserType);

                  break;


              }



            });

          }
          
          return {

            orders: orders,
            foods: foods,
            user_types: user_types,
            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneOrder(id: string): Observable<OrderPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<OrderResponse>(this.url.generateUrl(`orders/${id}`), { headers: headers }).pipe(
        map((response: OrderResponse): OrderPackage => {

          return {

            order: {

              key: response.data.id,
              value: { ...response.data.attributes, food_id: response.data.relationships.food.data.id, user_id: response.data.relationships.user.data.id }

            },

          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewOrder(order: Order) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      console.log(order);
      return this.http.post<OrderResponse>(this.url.generateUrl('orders'), { ...order, food_id: order.food_id, user_id: order.user_id }, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyOrder(order_id: string, order: Order) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.put(this.url.generateUrl(`orders/${order_id}`), order, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteOrder(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.delete(this.url.generateUrl(`orders/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}