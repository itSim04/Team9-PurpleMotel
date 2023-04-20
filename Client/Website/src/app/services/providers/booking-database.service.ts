import { UserType } from 'src/app/models/UserType';

import { User, UserAttributes } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookingsPackage, BookingsResponse, Booking, BookingPackage, BookingResponse, BookingAttributes, RawBookingsPackage } from 'src/app/models/Booking';
import { RawRoomsPackage, Room, RoomAttributes, RoomsResponse } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { extractUserId } from 'src/app/components/database/database.component';
import { UrlBuilderService } from '../utility/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class BookingDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllBookings(): Observable<BookingsPackage> {

    const token = extractUserId();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<BookingsResponse>(this.url.generateUrl('bookings'), { headers: headers }).pipe(


        map((response: BookingsResponse): BookingsPackage => {

          const bookings = new Map<string, Booking>();
          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();
          const users = new Map<string, User>();
          const user_types = new Map<string, UserType>();

          response.data.forEach(booking => {

            bookings.set(booking.id, { ...booking.attributes, room_id: booking.relationships.room.data.id, user_id: booking.relationships.user.data.id });

          });

          if (response.included) {

            response.included.forEach(value => {

              switch (value.type) {

                case 'Rooms':

                  rooms.set(value.id, { ...value.attributes as RoomAttributes, type: value.relationships.room_type.data.id });

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

    const headers = this.url.generateHeader()

    try {

      return this.http.get<BookingsResponse>(this.url.generateUrl(`room_bookings?room_id=${room_id}`), { headers: headers }).pipe(


        map((response: BookingsResponse): RawBookingsPackage => {

          const bookings = new Map<string, Booking>();

          response.data.forEach(booking => {

            bookings.set(booking.id, { ...booking.attributes, room_id: booking.relationships.room.data.id, user_id: booking.relationships.user.data.id });

          });

          return {

            bookings: bookings,

          };


        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  filterBookings(check_in: string, check_out: string): Observable<RawRoomsPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.post<RoomsResponse>(this.url.generateUrl(`filter`), { check_in: check_in, check_out: check_out }, { headers: headers }).pipe(


        map((response: RoomsResponse): RawRoomsPackage => {

          const rooms = new Map<string, Room>();

          response.data.forEach(room => {

            rooms.set(room.id, { ...room.attributes, type: room.relationships.room_type.data.id});

          });

          return {

            rooms: rooms,

          };


        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneBooking(id: string): Observable<BookingPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<BookingResponse>(this.url.generateUrl(`bookings/${id}`), { headers: headers }).pipe(
        map((response: BookingResponse): BookingPackage => {

          return {

            booking: {

              key: response.data.id,
              value: { ...response.data.attributes, room_id: response.data.relationships.room.data.id, user_id: response.data.relationships.user.data.id }

            },

          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  };

  addNewBooking(booking: Booking) {

    const headers = this.url.generateHeader()

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

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`bookings/${booking_id}`), booking, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteBooking(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`bookings/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}