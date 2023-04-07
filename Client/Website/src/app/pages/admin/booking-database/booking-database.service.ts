import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookingsPackage, BookingsResponse, Booking, BookingPackage, BookingResponse, BookingAttributes } from 'src/app/models/Booking';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { UrlBuilderService } from 'src/app/services/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class BookingDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllBookings(): Observable<BookingsPackage> {

    try {

      return this.http.get<BookingsResponse>(this.url.generateUrl('bookings')).pipe(

        map((response: BookingsResponse): BookingsPackage => {

          const bookings = new Map<string, Booking>();
          console.log(bookings)

            response.data.forEach(booking => {

              bookings.set(booking.id, booking.attributes);
             
            });

          return {

            bookings: bookings,
           

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneBooking(id: string): Observable<BookingPackage> {

    try {

      return this.http.get<BookingResponse>(this.url.generateUrl(`bookings/${id}`)).pipe(
        map((response: BookingResponse): BookingPackage => {

          return {

            booking: {

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

  addNewBooking(booking: Booking) {

    try {

      return this.http.post<BookingResponse>(this.url.generateUrl('bookings'), {...booking, password: 'password', date_of_birth: new Date(), language: '0'}).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyBooking(booking_id: string, booking: Booking) {

    try {

      return this.http.put(this.url.generateUrl(`bookings/${booking_id}`), booking).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteBooking(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`bookings/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}
