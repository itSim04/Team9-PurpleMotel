import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Booking } from 'src/app/models/Booking';
import { BookingDatabaseService } from 'src/app/pages/admin/booking-database/booking-database.service';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('picker') picker!: MatDatepicker<unknown>;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  conflicting_bookings: Map<string, Booking> = new Map();

  @Output() result: EventEmitter<{ check_in: Date, check_out: Date }> = new EventEmitter();

  @Input() room_id?: string;

  @Input() invisible_input = false;

  constructor(private room_service: BookingDatabaseService) { }

  ngOnInit() {

    this.range.valueChanges.subscribe(data => {

      this.emit();

    });


  }

  downloadConflicts() {

    console.log(this.room_id)

    if (this.room_id) {

      this.room_service.getAllRoomsBookings(this.room_id).subscribe(data => {

        this.conflicting_bookings = data.bookings;

        console.log(new Date(this.conflicting_bookings.get('2')?.check_in!).getTime())
        console.log(new Date(this.conflicting_bookings.get('2')?.end_date!).getTime())

        this.picker.open()

      })

    }


  }

  isDateInRange(date: string, startDate: string, endDate: string): boolean {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return d >= start && d <= end;
  }


  filter = (d: Date | null): boolean => {

    // Prevent Saturday and Sunday from being selected.

    if (!d) return false;

    for (const booking of this.conflicting_bookings) {

      if (this.isDateInRange(parseDate(d), booking[1].check_in, booking[1].end_date)) {

        return false;

      }

    }

    return true;


  };

  emit() {

    if (this.range.value.end && this.range.value.start) {
      this.result.emit({

        check_in: this.range.value.start,
        check_out: this.range.value.end

      });
    }

  }

}
