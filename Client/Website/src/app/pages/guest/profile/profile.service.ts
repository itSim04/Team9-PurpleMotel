import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Activity } from 'src/app/models/Activity';
import { Booking, BookingAttributes } from 'src/app/models/Booking';
import { Food, FoodAttributes } from 'src/app/models/Food';
import { Order, OrderAttributes } from 'src/app/models/Order';
import { OrderContains, OrderContainsAttributes } from 'src/app/models/OrderContains';
import { PromoCodeApplicationResponse, PromoCodeResponse } from 'src/app/models/PromoCode';
import { Registration, RegistrationAttributes } from 'src/app/models/Registration';
import { Room, RoomAttributes } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { Stock } from 'src/app/models/Stock';
import { ProfilePackage, ProfileResponse } from 'src/app/models/User';
import { UrlBuilderService } from 'src/app/services/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  orders = new Map<string, Order>();
  activities = new Map<string, Activity>();
  bookings = new Map<string, Booking>();


  constructor(private http: HttpClient, private url: UrlBuilderService) { }

  getAllData(): Observable<ProfilePackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<ProfileResponse>(this.url.generateUrl('fetch-profile'), { headers: headers }).pipe(

        map((response: ProfileResponse): ProfilePackage => {

          if (response.data) {

            const user_orders = new Map<string, Order>();
            const user_bookings = new Map<string, Booking>();
            const user_rooms = new Map<string, Room>();
            const user_room_types = new Map<string, RoomType>();
            const user_foods = new Map<string, Food>();
            const user_stocks = new Map<string, Stock>();
            const user_activities = new Map<string, Activity>();
            const user_registrations = new Map<string, Registration>();
            response.data.forEach(value => {


              switch (value.type) {


                case 'Booking':

                  user_bookings.set(value.id, { ...(value.attributes as BookingAttributes), user_id: value.relationships.room.data.id, room_id: value.relationships.room.data.id });
                  break;

                case 'RoomTypes':

                  user_room_types.set(value.id, value.attributes as RoomType);

                  break;

                case 'Rooms':

                  user_rooms.set(value.id, { ...(value.attributes as RoomAttributes), type: value.relationships.room_type.data.id.toString() });

                  break;

                case 'Foods':

                  user_foods.set(value.id, { ...(value.attributes as FoodAttributes), category: value.relationships.food_category.data.id.toString(), ingredients: [] });

                  break;

                case 'Stocks':

                  user_stocks.set(value.id, value.attributes as Stock);
                  break;

                case 'Ingredient':

                  const food = user_foods.get(value.relationships.food.data.id);

                  if (food) {

                    food.ingredients.push(value.relationships.stock.data.id);

                  } else {

                    throw new Error('Ingredient pivot missing Food.');

                  }
                  break;


                case 'Orders':

                  user_orders.set(value.id, { ...(value.attributes as OrderAttributes), user_id: value.relationships.user.data.id.toString(), food: [] });
                  break;

                case 'OrderContains':


                  const order = user_orders.get(value.relationships.order.data.id);

                  if (order) {

                    order.food.push({ id: value.relationships.food.data.id, quantity: (value.attributes as OrderContainsAttributes).quantity });

                  } else {

                    throw new Error('OrderContains pivot missing Order.');

                  }
                  break;

                case 'Activities':

                  user_activities.set(value.id, value.attributes as Activity);
                  break;

                case 'Registration':

                  user_registrations.set(value.id, { ...(value.attributes as RegistrationAttributes), activity_id: value.relationships.activity.data.id, user_id: value.relationships.user.data.id })
                  break;




              }
            });






            return {

              orders: user_orders,
              bookings: user_bookings,
              rooms: user_rooms,
              room_types: user_room_types,
              foods: user_foods,
              stocks: user_stocks,
              activities: user_activities,
              registrations: user_registrations



            };

          }
          throw new Error("Foreign key constraint error");

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  


}
