import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';
import { Component } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { BookingDatabaseService } from './booking-database.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-booking-database',
  templateUrl: './booking-database.component.html',
  styleUrls: ['./booking-database.component.scss']
})
export class BookingDatabaseComponent {

  constructor (private booking_service: BookingDatabaseService) { }
  data_injection: DataInjection<Booking> = {

    permission: 'booking',
    title: "Bookings",
    displayed_columns: [
      {
        key: 'user_id',
        type: 'outer_link',
        outer_link: {

          key: 'user_id',
          index: 3,
          format: (value) => (value as User)?.first_name + ' ' + (value as User)?.last_name
        },
      },
      {
        key: 'room_id',
        type: 'outer_link',
        outer_link: {

          key: 'room_id',
          index: 1,
          format: (value) => (value as Room)?.label

        },

      },
      {
        key: 'check_in'
      },
      {
        key: 'end_date'
      },
      {
        key: 'exhausted',
        type: 'boolean'
      }
    ],
    data_fetcher: () => this.booking_service.getAllBookings().pipe(map(data => {


      return [data.bookings, [data.room_types, data.rooms, data.user_types, data.users]];

    }))

  };
  change_injection: ChangeInjection<Booking> = {
    side_panel: 'empty',
    default_state: {
      check_in: new Date(),
      end_date: new Date(),
      exhausted: false,
      room_id: '0',
      user_id: '0'
    },
    data_type: 'Booking',
    fields: [
      {
        key: 'check_in',
        type: 'date'
      },
      {
        key: 'end_date',
        type: 'date'
      },
      {
        key: 'user_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => (choice as User)?.first_name + ' ' + (choice as User)?.last_name,
          index: 3


        }
      },
      {
        key: 'room_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => {

            return (choice as Room)?.label;
          },
          index: 1


        }
      }
    ],
    toggle: {
      key: 'exhausted',
      on_value: 'Exhausted',
      off_value: 'Pending'
    },
    add_service: booking => this.booking_service.addNewBooking(booking),
    modify_service: (key, data) => this.booking_service.modifyBooking(key, data),
    delete_service: key => this.booking_service.deleteBooking(key),
    identifier: (data) => data.check_in + " " + data.end_date,
  };

}
