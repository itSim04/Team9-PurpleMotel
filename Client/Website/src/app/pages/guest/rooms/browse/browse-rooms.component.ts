import { RawRoomsPackage } from './../../../../models/Room';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { PageEvent } from '@angular/material/paginator';
import { PromoCode } from 'src/app/models/PromoCode';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.scss']
})
export class BrowseRoomsComponent implements OnInit, OnDestroy {

  rooms: Map<string, Room> = new Map();
  room_types: Map<string, RoomType> = new Map();
  promo_codes: Map<string, PromoCode> = new Map();

  filtered_rooms: [string, Room][] = [];
  subscription?: Subscription;
  filtered = false;

  current_page: number = 0;
  page_size: number = 10;

  page = 0;

  constructor (private room_service: RoomDatabaseService) { }

  get data() {


    return Array.from(this.filtered_rooms);

  }
  ngOnInit(): void {

    this.subscription = this.room_service.getPaginatedRooms(this.current_page, this.page_size).subscribe(data => {
      data.rooms.forEach((value, key) => this.rooms.set(key, value));
      data.room_types.forEach((value, key) => this.room_types.set(key, value));
      data.promo_codes.forEach((value, key) => this.promo_codes.set(key, value));

      Array.from(data.rooms).forEach((value) => this.filtered_rooms.push(value));
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
