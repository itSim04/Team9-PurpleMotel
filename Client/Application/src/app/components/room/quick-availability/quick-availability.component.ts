import { RoomDatabaseService } from './../../../services/providers/room-database.service';
import { RoomType } from './../../../models/RoomType';
import { RawRoomsPackage, RoomsPackage } from './../../../models/Room';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';

@Component({
  selector: 'app-quick-availability',
  templateUrl: './quick-availability.component.html',
  styleUrls: ['./quick-availability.component.scss']
})
export class QuickAvailabilityComponent implements OnInit {

  @Output() result: EventEmitter<RoomsPackage> = new EventEmitter();

  start_date_value?: Date;
  end_date_value?: Date;
  adults_value: number = 0;
  kids_value: number = 0;

  loading = false;

  adult_capacity: number[] = [];
  kids_capacity: number[] = [];
  constructor (private booking_service: BookingDatabaseService, private room_services: RoomDatabaseService) { }

  ngOnInit(): void {


    this.room_services.getAllRoomTypes().subscribe(data => {

      this.adult_capacity = Array.from(new Set(Array.from(data.room_types.values()).map(t => t.adults_capacity))).sort((a, b) => a - b);
      this.kids_capacity = Array.from(new Set(Array.from(data.room_types.values()).map(t => t.kids_capacity))).sort((a, b) => a - b);

    });


  }



  checkAvailability() {

    if (this.start_date_value && this.end_date_value) {
  
      this.loading = true;
      this.booking_service.filterBookings(
        parseDate(this.start_date_value),
        parseDate(this.end_date_value),
        this.adults_value,
        this.kids_value
      ).subscribe(data => {


        this.result.emit(data);
        this.loading = false;

      });

    }
  }
}
