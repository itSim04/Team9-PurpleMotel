import { Booking } from 'src/app/models/Booking';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { RawRoomsPackage, Room } from 'src/app/models/Room';
import { Subscription } from 'rxjs';
import { PromoCode } from 'src/app/models/PromoCode';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';
import { ProfileModalData } from '../../profile/profile-modal/profile-modal.component';
import { extractUserId } from 'src/app/components/database/database.component';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';

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


  openModal(room: [string, Room]) {

    this.active_data = undefined;

    this.isModalOpened = true;

    const room_type = this.room_types.get(room[1].type)!;

    this.active_data = {

      key: room[0],
      value: room[1],

    };
  }


  closeModal($event: KeyValue<string, Booking>) {

    this.isModalOpened = false;
    this.active_data = undefined;

    if ($event) {
      localStorage.setItem('temp_profile_room', JSON.stringify($event));
      setTimeout(() => {

        this.router.navigate(['profile']);

      }, 100);

    }

  }

  rooms: Map<string, Room> = new Map();
  room_types: Map<string, RoomType> = new Map();
  promo_codes: Map<string, PromoCode> = new Map();

  filtered_rooms: [string, Room][] = [];
  subscription?: Subscription;
  filtered = false;

  current_page: number = 0;
  page_size: number = 10;

  page = 0;

  isModalOpened = false;
  active_data?: KeyValue<string, Room>;

  constructor (private rooms_service: RoomDatabaseService, private router: Router) { }


  get data() {

    return Array.from(this.filtered_rooms);

  }

  // ngOnInit() {
  //   this.subscription = this.rooms_service.getAllRooms().subscribe(data => {
  //     this.rooms = data.rooms;
  //     console.log(this.rooms);
  //     this.filtered_rooms = Array.from(this.rooms);
  //   });

  // }

  ngOnInit(): void {

    this.subscription = this.rooms_service.getPaginatedRooms(this.current_page, this.page_size).subscribe(data => {
      data.rooms.forEach((value, key) => this.rooms.set(key, value));
      data.room_types.forEach((value, key) => this.room_types.set(key, value));
      data.promo_codes.forEach((value, key) => this.promo_codes.set(key, value));

      Array.from(data.rooms).forEach((value) => this.filtered_rooms.push(value));

      console.log(this.filtered_rooms);
      this.current_page += this.page_size;
    });

  }

  filterRooms(result: RawRoomsPackage) {

    this.filtered_rooms = Array.from(result.rooms);
    this.filtered = true;

  }
  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }

  getEffect(room_id: string, type: string) {


    for (let code of this.promo_codes.values()) {


      if (code.concerned_everything || code.concerned_rooms.includes(room_id) || code.concerned_room_types.includes(type))
        return code.change;



    }
    return 0;



  }

}
