import { RawRoomsPackage } from './../../../models/Room';
import { BookingDatabaseService } from './../../../pages/admin/booking-database/booking-database.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';

@Component({
  selector: 'app-quick-availability',
  templateUrl: './quick-availability.component.html',
  styleUrls: ['./quick-availability.component.scss']
})
export class QuickAvailabilityComponent {

  @Output() result: EventEmitter<RawRoomsPackage> = new EventEmitter();

  start_date_value?: Date;
  end_date_value?: Date;
  adults_value: number = 0;
  kids_value: number = 0;

  loading = false;

  constructor (private booking_service: BookingDatabaseService) { }


  checkAvailability() {

    if (this.start_date_value && this.end_date_value) {
      this.loading = true;
      this.booking_service.filterBookings(
        parseDate(this.start_date_value),
        parseDate(this.end_date_value)
      ).subscribe(data => {


        this.result.emit(data);
        this.loading = false;

      });

    }
  }
}
