import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { OrdersResponse, Order, OrderResponse, OrderPackage, OrdersPackage } from "src/app/models/Order";
import { UrlBuilderService } from "src/app/services/url-builder.service";


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

          response.data.forEach(order => {

            orders.set(order.id, order.attributes);

          });

          return {

            orders: orders

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
              value: response.data.attributes

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