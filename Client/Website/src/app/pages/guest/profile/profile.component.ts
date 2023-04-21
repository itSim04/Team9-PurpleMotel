import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CarouselComponent } from 'src/app/components/general/carousel/carousel.component';
import { Booking } from 'src/app/models/Booking';
import { BrowsingDialogService } from 'src/app/services/dialogs/browsing/browsing.service';
import { BookingDatabaseService } from '../../admin/booking-database/booking-database.service';
import { ProfileDialogService } from './profile.service';
import { RoomType } from 'src/app/models/RoomType';
import { filter } from 'rxjs';
import { ProfileService } from './profile.service';
import { Order } from 'src/app/models/Order';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { KeyValue } from '@angular/common';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]

})
export class ProfileComponent implements OnInit {

  bookings!: Map<string, Booking>;
  orders!: Map<string, Order>;
  rooms!: Map<string, Room>;
  room_types!: Map<string, RoomType>;
  activities!: Map<string, Activity>;
  registrations!: Map<string, Registration>;
  user = JSON.parse(localStorage.getItem!('user')!);
  first_name = this.user.first_name;
  last_name = this.user.last_name;

  keyDescOrder = (a: KeyValue<string, Booking>, b: KeyValue<string, Booking>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };

  @ViewChild('carousel') carousel !: CarouselComponent;

  constructor(private browsing_service: BrowsingDialogService, private booking_service: BookingDatabaseService, private profile_service: ProfileDialogService){}

  edit_profile() {

    this.profile_service.openDialog("edit_profile");

  }

  change_password() {

    this.profile_service.openDialog("change_password");

  }
  
  async ngOnInit() {

    this.profile_service.getAllData().subscribe(data => {

      this.bookings = data.bookings;
      this.orders = data.orders;
      this.rooms = data.rooms;
      this.room_types = data.room_types;
      this.activities = data.activities;
      this.registrations = data.registrations;

    });

  }

  browseBookingHistory = () => this.browseBookingHistoryHelper();


  browseBookingHistoryHelper() {

    const browsing = this.browsing_service.openDialog([
      this.bookings
    ]);
    browsing.afterClosed().subscribe(result => {
      if (result + 1 && result < this.bookings.size) {

        this.carousel.currentSlide = result;
        this.carousel.fixRatio();
      }
    });

  }
}
