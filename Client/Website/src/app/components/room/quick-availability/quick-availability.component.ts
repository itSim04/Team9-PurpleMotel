import { RoomDatabaseService } from './../../../services/providers/room-database.service';
import { RoomType } from './../../../models/RoomType';
import { RawRoomsPackage, RoomsPackage } from './../../../models/Room';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';

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



    this.loading = true;
    this.booking_service.filterBookings(
      this.start_date_value ? parseDate(this.start_date_value) : undefined,
      this.end_date_value ? parseDate(this.end_date_value) : undefined,
      this.adults_value ? this.adults_value : undefined,
      this.kids_value ? this.kids_value : undefined
    ).subscribe(data => {


      this.result.emit(data);
      this.loading = false;

    });


  }
}
