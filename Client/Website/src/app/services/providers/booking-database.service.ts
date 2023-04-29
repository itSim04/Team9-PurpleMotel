import { UserType } from 'src/app/models/UserType';

import { User, UserAttributes } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookingsPackage, BookingsResponse, Booking, BookingPackage, BookingResponse, BookingAttributes, RawBookingsPackage } from 'src/app/models/Booking';
import { RawRoomsPackage, Review, Room, RoomAttributes, RoomsPackage, RoomsResponse } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { extractUserId } from 'src/app/components/database/database.component';
import { UrlBuilderService } from '../utility/url-builder.service';
import { PromoCode, EffectPromoCodes, PromoCodeAttributes } from 'src/app/models/PromoCode';

@Injectable({
  providedIn: 'root'
})
export class BookingDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllBookings(): Observable<BookingsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<BookingsResponse>(this.url.generateUrl('bookings'), { headers: headers }).pipe(


        map((response: BookingsResponse): BookingsPackage => {

          const bookings = new Map<string, Booking>();
          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();
          const users = new Map<string, User>();
          const user_types = new Map<string, UserType>();
          const images  = response.images;

          response.data.forEach(booking => {

            bookings.set(booking.id, { ...booking.attributes, room_id: booking.relationships.room.data.id, user_id: booking.relationships.user.data.id, promo_id: booking.relationships.promo.data.id });

          });

          if (response.included) {

            response.included.forEach(value => {

              switch (value.type) {

                case 'Rooms':

                  rooms.set(value.id, { ...value.attributes as RoomAttributes, type: value.relationships.room_type.data.id, reviews: [], is_reviewed: false, images: images.rooms[value.id] });

                  break;

                case 'RoomTypes':

                  room_types.set(value.id, value.attributes as RoomType);

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

            bookings: bookings,
            room_types: room_types,
            rooms: rooms,
            user_types: user_types,
            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getAllRoomsBookings(room_id: string): Observable<RawBookingsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<BookingsResponse>(this.url.generateUrl(`room_bookings?room_id=${room_id}`), { headers: headers }).pipe(


        map((response: BookingsResponse): RawBookingsPackage => {

          const bookings = new Map<string, Booking>();

          response.data.forEach(booking => {

            bookings.set(booking.id, { ...booking.attributes, room_id: booking.relationships.room.data.id, user_id: booking.relationships.user.data.id, promo_id: booking.relationships.promo.data.id });

          });

          return {

            bookings: bookings,

          };


        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  filterBookings(check_in: string, check_out: string, adults_capacity: number, kids_capacity: number): Observable<RoomsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<RoomsResponse>(this.url.generateUrl(`filter`), { check_in: check_in, check_out: check_out, adults_capacity: adults_capacity, kids_capacity: kids_capacity }, { headers: headers }).pipe(


        map((response: RoomsResponse): RoomsPackage => {

          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();
          const promo_codes = new Map<string, PromoCode>();
          const effect_codes: EffectPromoCodes[] = [];
          const images = response.images;

          response.data.forEach(room => {

            const roomType = room.relationships?.room_type?.data?.id;
            rooms.set(room.id, { ...room.attributes, type: roomType, reviews: [], is_reviewed: false, images: images.rooms[room.id] });

          });

          if (response.included) {

            response.included.forEach(data => {

              switch (data.type) {

                case 'RoomTypes':

                  room_types.set(data.id, data.attributes as RoomType);
                  break;

                case 'PromoCodes':

                  promo_codes.set(data.id, {
                    ...data.attributes as PromoCodeAttributes, concerned_everyone: false,
                    exhausted: false,
                    concerned_everything: false,
                    concerned_room_types: [],
                    concerned_rooms: [],
                    applied_users: [],
                    concerned_user_tiers: [],
                    concerned_user_types: [],
                    concerned_users: [],
                  });
                  break;

                case 'EffectPromoCodes':

                  effect_codes.push(data.attributes as EffectPromoCodes);
                  break;

                case 'Review':

                  const room = rooms.get((data.attributes as Review).room_id);
                  if (room) {

                    if ((data.attributes as Review).user_id == extractUserId()) room.is_reviewed = true;
                    room.reviews.push(data.attributes as Review);

                  }



              }

            });

            effect_codes.forEach(code => {

              const temp = promo_codes.get(code.promo_id);
              if (temp) {

                switch (code.type) {

                  case 0:

                    temp.concerned_rooms.push(code.effect_id);
                    break;

                  case 1:

                    temp.concerned_room_types.push(code.effect_id);
                    break;

                  case 2:

                    temp.concerned_everything = true;
                    break;

                  default:

                    throw new Error('Invalid type');




                }

              }

            });

          }

          return {

            rooms: rooms,
            room_types: room_types,
            promo_codes: promo_codes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneBooking(id: string): Observable<BookingPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<BookingResponse>(this.url.generateUrl(`bookings/${id}`), { headers: headers }).pipe(
        map((response: BookingResponse): BookingPackage => {

          return {

            booking: {

              key: response.data.id,
              value: { ...response.data.attributes, room_id: response.data.relationships.room.data.id, user_id: response.data.relationships.user.data.id, promo_id: response.data.relationships.promo.data.id }

            },

          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  };

  addNewBooking(booking: Booking) {

    const headers = this.url.generateHeader();

    try {
      console.log(booking);
      return this.http.post<BookingResponse>(this.url.generateUrl('bookings'), { ...booking, room_id: booking.room_id, user_id: booking.user_id }, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyBooking(booking_id: string, booking: Booking) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`bookings/${booking_id}`), booking, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteBooking(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`bookings/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}
