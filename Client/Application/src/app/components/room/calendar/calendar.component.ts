import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDateRangeInput, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/Booking';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';
import { extractUser } from '../../database/database.component';
import { CalendarModalOptions, CalendarModal, CalendarResult, DayConfig } from 'ion2-calendar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarWrapperComponent {
  start: Date | undefined;
  end: Date | undefined;


  conflicting_bookings: Map<string, Booking> = new Map();

  openCalendar() {
    
    console.log("openCalendar", extractUser(), this.room_id);
    
    if (extractUser()) {
      
      
      if (this.room_id) {
        
        this.room_service.getAllRoomsBookings(this.room_id).subscribe(data => {

          this.conflicting_bookings = data.bookings;

          this.open();

        });

      }
    } else {

      this.router.navigate(['auth']);
    }

  }

  iterateDays() {
    const startDate = new Date(); // Today's date
    const endDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year forward from today
    const day = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const dates: string[] = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(parseDate(date)); // Print the date in a readable format
    }
    return dates;
  }

  async open() {

    const forbidden_dates: DayConfig[] = [];

    console.log(this.conflicting_bookings);

    this.iterateDays().forEach(date => {

      if (!this.filter(new Date(date))) {

        forbidden_dates.push({
          date: new Date(date),
          disable: true
        });


      }

    });

    console.log(forbidden_dates);

    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'RANGE',
      daysConfig: forbidden_dates
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date = event.data;
    const from: CalendarResult = date?.from;
    const to: CalendarResult = date?.to;

    if(from && to) {


      this.start = new Date(from.string);
      this.end = new Date(to.string);
      
      this.emit();
    }

  }

  @Output() result: EventEmitter<{ check_in: Date, check_out: Date; }> = new EventEmitter();

  @Input() room_id?: string;

  @Input() invisible_input = false;

  closer?: () => void;


  constructor (private router: Router, private room_service: BookingDatabaseService, private snackBar: MatSnackBar, private modalCtrl: ModalController) { }

  isDateInRange(date: string, startDate: string, endDate: string): boolean {

    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return d >= start && d <= end;
  }


  filter = (d: Date | null): boolean => {

    // Prevent Saturday and Sunday from being selected.

    if (!d) return false;

    if (d < new Date()) return false;

    for (const booking of this.conflicting_bookings) {

      if (this.isDateInRange(parseDate(d), booking[1].check_in, booking[1].end_date)) {

        return false;

      }

    }

    return true;


  };

  emit() {



    if (this.end && this.start) {
      this.result.emit({

        check_in: this.start,
        check_out: this.end

      });
    }

  }

}
