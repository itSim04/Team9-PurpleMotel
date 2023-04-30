import { Booking } from 'src/app/models/Booking';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Interface } from 'readline';
import { Required, extractUserId, formatDate, formatPrice } from 'src/app/components/database/database.component';
import { Activity } from 'src/app/models/Activity';
import { PromoCode } from 'src/app/models/PromoCode';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';

@Component({
  selector: 'app-quick-availability',
  templateUrl: './quick-availability.component.html',
  styleUrls: ['./quick-availability.component.scss'],
})
export class QuickAvailabilityModalComponent {

  adults = 0;
  children = 0;

  check_in = '';
  check_in_open = false;
  check_out_open = false;
  check_out = '';
  @Output() closeModal: EventEmitter<{

    check_in: string;
    check_out: string;
    adults: number;
    children: number;


  }> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };
  constructor (private router: Router, private booking_service: BookingDatabaseService, private toastController: ToastController) { }


  updateCheckin(s: Event) {

    this.check_in = parseDate(new Date((s as CustomEvent).detail.value));

    this.check_in_open = false;

  }
  updateCheckout(s: Event) {

    this.check_out = parseDate(new Date((s as CustomEvent).detail.value));

    this.check_out_open = false;

  }
  saveBookingRange($event: { check_in: Date; check_out: Date; }) {

    this.range = $event;
    console.log($event, this.range);

  }

  formatDate(date: Date | undefined) {

    return date ? parseDate(date).split('-').reverse().join('/') : 'No Date selected';

  }



}
