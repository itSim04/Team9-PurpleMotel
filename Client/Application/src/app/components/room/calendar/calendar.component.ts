import { Router } from '@angular/router';
import { Component, Output, EventEmitter, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDateRangeInput, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/authentication.service';
import { Booking } from 'src/app/models/Booking';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';
import { extractUser } from '../../database/database.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('picker') picker!: MatDatepicker<unknown>;
  @ViewChild('picker_range') picker_range!: MatDateRangeInput<unknown>;
  @ViewChild('input1') input!: MatInput;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  conflicting_bookings: Map<string, Booking> = new Map();

  @Output() result: EventEmitter<{ check_in: Date, check_out: Date }> = new EventEmitter();

  @Input() room_id?: string;

  @Input() invisible_input = false;

  closer?: () => void;


  constructor(private router: Router, private room_service: BookingDatabaseService, private snackBar: MatSnackBar, private authentication: AuthenticationService) { }

  ngOnInit() {

    this.range.valueChanges.subscribe(data => {

      this.emit();

    });

  }

  downloadConflicts() {


    if(extractUser()) {


      if (this.room_id) {
        
        this.room_service.getAllRoomsBookings(this.room_id).subscribe(data => {

          this.conflicting_bookings = data.bookings;

        this.picker.open()
        
      })
      
    }
  } else {

    this.router.navigate(['/auth/login']);
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

    if(d < new Date()) return false;

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
