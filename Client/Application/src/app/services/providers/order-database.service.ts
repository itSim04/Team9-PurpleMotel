import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Food, FoodAttributes } from "src/app/models/Food";
import { OrdersPackage, OrdersResponse, Order, OrderPackage, OrderResponse } from "src/app/models/Order";
import { OrderContains, OrderContainsAttributes } from "src/app/models/OrderContains";
import { User, UserAttributes } from "src/app/models/User";
import { UrlBuilderService } from "../utility/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class OrderDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllOrders(): Observable<OrdersPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<OrdersResponse>(this.url.generateUrl('orders'), { headers: headers }).pipe(


        map((response: OrdersResponse): OrdersPackage => {

          if (response.included) {

            const foods = new Map<string, Food>();
            const order_contains = new Map<string, OrderContains>();
            const orders = new Map<string, Order>();
            const users = new Map<string, User>();

            response.data.forEach(order => {

              orders.set(order.id, { ...order.attributes, user_id: order.relationships.user.data.id, food: [] });

            });

            response.included.forEach(value => {

              switch (value.type) {


                case 'Foods':

                  foods.set(value.id, { ...value.attributes as FoodAttributes, category: value.relationships.food_category.data.id, ingredients: [], image: response.images.food[value.id]?.at(0) || '' });
                  break;

                case 'OrderContains':

                  order_contains.set(value.id, { ...(value.attributes as OrderContainsAttributes), food_id: value.relationships.food.data.id, order_id: value.relationships.order.data.id });
                  orders.get(value.relationships.order.data.id)?.food.push({

                    id: value.relationships.food.data.id,
                    quantity: (value.attributes as OrderContainsAttributes).quantity

                  });

                  break;

                case 'Users':

                  users.set(value.id, { ...(value.attributes as UserAttributes), type: value.relationships.user_type.data.id, permissions: new Map() });

              }


            });

            return {

              foods: foods,
              order_contains: order_contains,
              orders: orders,
              users: users,

            };
          }

          throw new Error("Foreign key constraint error");

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneOrder(id: string): Observable<OrderPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<OrderResponse>(this.url.generateUrl(`orders/${id}`), { headers: headers }).pipe(
        map((response: OrderResponse): OrderPackage => {

          return {

            order: {

              key: response.data.id,
              value: { ...response.data.attributes, food: [], user_id: response.data.relationships.user.data.id }

            },

          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewOrder(order: Order) {

    const headers = this.url.generateHeader()

    try {
      console.log(order);
      return this.http.post<OrderResponse>(this.url.generateUrl('orders'), order, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyOrder(order_id: string, order: Order) {

    const headers = this.url.generateHeader()

    console.log(order);
    try {

      return this.http.put(this.url.generateUrl(`orders/${order_id}`), order, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteOrder(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`orders/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}