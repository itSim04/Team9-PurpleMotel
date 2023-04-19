import { User } from './../../../models/User';
import { Order } from 'src/app/models/Order';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { KeyValue } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from 'src/app/components/general/carousel/carousel.component';
import { Booking } from 'src/app/models/Booking';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { BrowsingDialogService } from 'src/app/services/dialogs/browsing/browsing.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { PromoDialogService } from 'src/app/services/dialogs/promo/promo.service';
import { extractUser } from 'src/app/components/database/database.component';
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
  user: User;
  first_name;
  last_name;



  keyDescOrder = (a: KeyValue<string, Booking>, b: KeyValue<string, Booking>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  activity_key = (a: KeyValue<string, Registration>, b: KeyValue<string, Registration>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };

  @ViewChild('carousel') carousel !: CarouselComponent;

  constructor (private browsing_service: BrowsingDialogService, private profile_service: ProfileService, private router: Router, private promo_service: PromoDialogService) {

    const user = extractUser();
    if(user) {

      this.user = user;
      this.first_name = this.user.first_name;
      this.last_name = this.user.last_name;
    } else {

      throw new Error('Unauthenticated user');

    }

  }

  async ngOnInit() {

    this.profile_service.getAllData().subscribe(data => {
      this.bookings = data.bookings;
      this.orders = data.orders;
      this.rooms = data.rooms;
      this.room_types = data.room_types;
      this.activities = data.activities;
      this.registrations = data.registrations;
      console.log(data);
    });



  }

  applyCode() {
    this.promo_service.openDialog();
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.router.navigate(['/home']);


  }
}