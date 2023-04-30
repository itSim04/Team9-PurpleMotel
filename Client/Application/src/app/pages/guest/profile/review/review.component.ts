import { IntelAttributes } from '../../../../models/Room';
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
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewModalComponent {

  review = '';
  title = '';
  rating = 0;
  intel: IntelAttributes = {

    bathroom: 0,
    bed: 0,
    layout: 0,
    view: 0,
    smoke: 0,
    quiet: 0,
    proximity: 0,
    wifi: 0,
    tv: 0


  }
  @Output() closeModal: EventEmitter<{

    intel: IntelAttributes,
    review: string,
    rating: number,
    title: string,


  }> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };
  constructor (private router: Router, private booking_service: BookingDatabaseService, private toastController: ToastController) { }

  get properties() {

    return Object.keys(this.intel) as (keyof IntelAttributes)[];

  }

  saveBookingRange($event: { check_in: Date; check_out: Date; }) {

    this.range = $event;
    console.log($event, this.range);

  }

  formatDate(date: Date | undefined) {

    return date ? parseDate(date).split('-').reverse().join('/') : 'No Date selected';

  }



}
