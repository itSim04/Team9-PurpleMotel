import { IngredientAttributes } from './../../models/Ingredient';
import { PromoCode, PromoCodeAttributes } from 'src/app/models/PromoCode';
import { ComponentType } from "@angular/cdk/portal";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, map, catchError, throwError } from "rxjs";
import { extractUserId } from "src/app/components/database/database.component";
import { Activity } from "src/app/models/Activity";
import { Booking, BookingAttributes } from "src/app/models/Booking";
import { Food, FoodAttributes } from "src/app/models/Food";
import { Order, OrderAttributes } from "src/app/models/Order";
import { OrderContainsAttributes } from "src/app/models/OrderContains";
import { Registration, RegistrationAttributes } from "src/app/models/Registration";
import { Room, Review, RoomAttributes } from "src/app/models/Room";
import { RoomType } from "src/app/models/RoomType";
import { Stock } from "src/app/models/Stock";
import { ProfilePackage, ProfileResponse } from "src/app/models/User";
import { UserDatabaseService } from "../providers/user-database.service";
import { UrlBuilderService } from "./url-builder.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  orders = new Map<string, Order>();
  activities = new Map<string, Activity>();
  bookings = new Map<string, Booking>();


  constructor (private url: UrlBuilderService, public dialog: MatDialog, private http: HttpClient, private userDatabaseService: UserDatabaseService) { }

  getAllData(): Observable<ProfilePackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<ProfileResponse>(this.url.generateUrl('fetch-profile'), { headers: headers }).pipe(

        map((response: ProfileResponse): ProfilePackage => {

          console.log(response);
          if (response.data) {

            const user_orders = new Map<string, Order>();
            const user_bookings = new Map<string, Booking>();
            const user_rooms = new Map<string, Room>();
            const user_room_types = new Map<string, RoomType>();
            const user_foods = new Map<string, Food>();
            const user_stocks = new Map<string, Stock>();
            const user_activities = new Map<string, Activity>();
            const user_registrations = new Map<string, Registration>();
            const user_reviews = new Map<string, Review>();
            const user_promo = new Map<string, PromoCode>();
            const images = response.images;
            response.data.forEach(value => {


              switch (value.type) {


                case 'Booking':

                  user_bookings.set(value.id, { ...(value.attributes as BookingAttributes), user_id: value.relationships.room.data.id, room_id: value.relationships.room.data.id, promo_id: value.relationships.promo.data.id });
                  break;

                case 'RoomTypes':

                  user_room_types.set(value.id, value.attributes as RoomType);

                  break;

                case 'Rooms':

                  user_rooms.set(value.id, { ...(value.attributes as RoomAttributes), type: value.relationships.room_type.data.id.toString(), reviews: [], is_reviewed: false, images: images.rooms ? images.rooms[value.id] : [] });

                  break;

                case 'Foods':

                  user_foods.set(value.id, { ...(value.attributes as FoodAttributes), category: value.relationships.food_category.data.id.toString(), ingredients: [], image: images.food ? images.food[value.id][0] : '' });

                  break;

                case 'Stocks':

                  user_stocks.set(value.id, value.attributes as Stock);
                  break;

                case 'Ingredient':

                  const food = user_foods.get(value.relationships.food.data.id);

                  if (food) {

                    food.ingredients.push({

                      id: value.relationships.stock.data.id,
                      quantity: (value.attributes as IngredientAttributes).quantity,
                      required: (value.attributes as IngredientAttributes).required

                    });

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

                  user_registrations.set(value.id, { ...(value.attributes as RegistrationAttributes), activity_id: value.relationships.activity.data.id, user_id: value.relationships.user.data.id });
                  break;

                case 'Review':

                  const room = user_rooms.get((value.attributes as Review).room_id);
                  if (room) {

                    if ((value.attributes as Review).user_id == extractUserId()) room.is_reviewed = true;
                    room.reviews.push(value.attributes as Review);

                  }
                  break;

                case 'PromoCodes':

                  user_promo.set(value.id, {
                    ...value.attributes as PromoCodeAttributes,
                    exhausted: false,
                    concerned_everyone: false,
                    concerned_everything: false,
                    concerned_room_types: [],
                    applied_users: [],
                    concerned_rooms: [],
                    concerned_user_tiers: [],
                    concerned_user_types: [],
                    concerned_users: []
                  });



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
              registrations: user_registrations,
              reviews: user_reviews,
              promo: user_promo



            };

          }
          throw new Error("Foreign key constraint error");

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }





  resetPassword(email: string): Observable<void> {

    return this.http.post<void>("http://127.0.0.1:8000/api/v1/auth/reset-password", { email }).pipe(

      map(result => {

        // handle successful reset password response (if any)

      }), catchError(error => {

        // handle error response

        return throwError(error);

      })

    );
  }



  // resetPassword(email: string, token: string, newPassword: string): Observable<void> {
  //   const resetRequest = {
  //     email: email,
  //     token: token,
  //     password: newPassword
  //   };

  //   return this.http.post<void>('http://example.com/api/reset-password', resetRequest);
  // }



}
