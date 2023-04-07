import { Component } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { DataInjection } from 'src/app/models/Database';
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
        key: 'exhausted'
      }
    ],
    data_fetcher: () => this.booking_service.getAllBookings().pipe(map(data => data.bookings))
    
  };
    
  
}
