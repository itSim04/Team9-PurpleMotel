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
    title: "Bookings",
    displayed_columns: [
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
    data_fetcher: () => this.booking_service.getAllBookings().pipe(map(data => data.bookings))
    
  };
  change_injection: ChangeInjection<Booking> = {
    side_panel: 'empty',
    default_state:{
      check_in: new Date(),
      end_date: new Date(),
      exhausted:false
    },
    data_type: 'Bookings',
    fields: [
      {
        key:'check_in',
        type:'date'
      },
      {
        key:'end_date',
        type:'date'
      }
    ],
    toggle : {
      key: 'exhausted',
      on_value: 'Exhausted',
      off_value: 'Pending'
    },
    add_service: booking => this.booking_service.addNewBooking(booking),
    modify_service: (key, data) => this.booking_service.modifyBooking(key, data),
    delete_service: key => this.booking_service.deleteBooking(key),
    identifier: (data) => data.check_in + " " + data.end_date,
  }
  
}
