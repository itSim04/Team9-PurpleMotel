import { IntelAttributes } from './../../../../models/Room';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';
import { ViewChild } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { IonInfiniteScroll } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { RawRoomsPackage, Room } from 'src/app/models/Room';
import { Subscription } from 'rxjs';
import { PromoCode } from 'src/app/models/PromoCode';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]
})
export class BrowseRoomsComponent implements OnInit {

  rooms: Map<string, Room> = new Map();
  room_types: Map<string, RoomType> = new Map();
  promo_codes: Map<string, PromoCode> = new Map();

  filtered_rooms: [string, Room][] = [];
  subscription?: Subscription;
  filtered = false;

  current_page: number = 0;
  page_size: number = 8;

  page = 0;

  isModalOpened = false;
  isQuickOpened = false;
  isRecommendOpened = false;
  active_data?: KeyValue<string, Room>;

  room_bg = this.url.getImage('room-main');

  constructor (private rooms_service: RoomDatabaseService, private router: Router, private url: UrlBuilderService, private booking_service: BookingDatabaseService) { }
  @ViewChild(IonInfiniteScroll) scroller!: IonInfiniteScroll;

  openModal(room: [string, Room]) {

    this.active_data = undefined;

    this.isQuickOpened = false;
    this.isModalOpened = true;

    const room_type = this.room_types.get(room[1].type)!;

    this.active_data = {

      key: room[0],
      value: room[1],

    };
  }


  closeModal($event: KeyValue<string, [Booking, Room, RoomType]>) {

    this.isModalOpened = false;
    this.active_data = undefined;

    if ($event) {
      localStorage.setItem('temp_profile_booking', JSON.stringify({ key: $event.key, value: $event.value[0] }));
      localStorage.setItem('temp_profile_room', JSON.stringify({ key: $event.key, value: $event.value[1] }));
      localStorage.setItem('temp_profile_room_type', JSON.stringify({ key: $event.key, value: $event.value[2] }));

      setTimeout(() => {

        this.router.navigate(['profile']);

      }, 100);

    }

  }

  openQuick() {

    this.active_data = undefined;

    this.isQuickOpened = true;
    this.isModalOpened = false;
    this.isRecommendOpened = false;
  }
  openRecommend() {

    this.active_data = undefined;

    this.isQuickOpened = false;
    this.isModalOpened = false;
    this.isRecommendOpened = true;
  }


  closeQuick($event: { check_in: string, check_out: string, adults: number, children: number; }) {


    if ($event) {

      this.booking_service.filterBookings(
        $event.check_in,
        $event.check_out,
        $event.adults,
        $event.children
      ).subscribe({

        next: data => {

          this.isQuickOpened = false;

          this.filtered = true;

          this.filtered_rooms = Array.from(data.rooms);

          data.rooms.forEach((value, key) => this.rooms.set(key, value));
          data.room_types.forEach((value, key) => this.room_types.set(key, value));
          data.promo_codes.forEach((value, key) => this.promo_codes.set(key, value));

        },
        error: error => {

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('token_time');
            this.router.navigate(['/auth']);

          }
          console.error(error);

        }
      });




    } else {

      this.isQuickOpened = false;

    }

  }
  closeRecommend($event: { intel: IntelAttributes, check_in: string, check_out: string, adults: number, children: number; }) {


    if ($event) {

      this.rooms_service.recommendRoom(
        $event.intel,
        $event.check_in,
        $event.check_out,
        $event.adults,
        $event.children
      ).subscribe({

        next: data => {

          this.isRecommendOpened = false;

          this.filtered = true;

          this.filtered_rooms = Array.from(data.rooms);

          data.rooms.forEach((value, key) => this.rooms.set(key, value));
          data.room_types.forEach((value, key) => this.room_types.set(key, value));
          data.promo_codes.forEach((value, key) => this.promo_codes.set(key, value));

        },
        error: error => {

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('token_time');
            this.router.navigate(['/auth']);

          }
        }
      });




    } else {


      this.isRecommendOpened = false;

    }

  }





  get data() {

    return Array.from(this.filtered_rooms);

  }

  download() {

    if (!this.filtered) {


      this.subscription = this.rooms_service.getPaginatedRooms(this.current_page, this.page_size).subscribe(data => {
        data.rooms.forEach((value, key) => this.rooms.set(key, value));
        data.room_types.forEach((value, key) => this.room_types.set(key, value));
        data.promo_codes.forEach((value, key) => this.promo_codes.set(key, value));


        Array.from(data.rooms).forEach((value) => this.filtered_rooms.push(value));

        this.current_page += data.rooms.size;
        if (data.rooms.size)
          this.scroller.complete();
      });

    }
  }

  ngOnInit(): void {

    console.log('Loading rooms...');
    this.download();


  }

  filterRooms(result: RawRoomsPackage) {

    this.filtered_rooms = Array.from(result.rooms);
    this.filtered = true;

  }
  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }

  getEffect(room_id: string, type: string) {


    for (let code of this.promo_codes.entries()) {


      if (code[1].concerned_everything || code[1].concerned_rooms.includes(room_id) || code[1].concerned_room_types.includes(type))
        return {

          key: code[0],
          value: code[1]
        };



    }
    return undefined;



  }

}
