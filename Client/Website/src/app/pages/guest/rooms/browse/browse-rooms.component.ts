import { RawRoomsPackage } from './../../../../models/Room';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/pages/admin/room-database/room-database.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.scss']
})
export class BrowseRoomsComponent implements OnInit, OnDestroy {

  rooms: Map<string, Room> = new Map();
  room_types: Map<string, RoomType> = new Map();

  filtered_rooms: [string, Room][] = [];
  subscription?: Subscription;
  filtered = false;

  page = 0;

  constructor (private room_service: RoomDatabaseService) { }

  get data() {


    return Array.from(this.filtered_rooms);

  }
  ngOnInit(): void {

    this.subscription = this.room_service.getAllRooms().subscribe(data => {
      this.rooms = data.rooms;
      this.room_types = data.room_types;
      this.filtered_rooms = Array.from(this.rooms);
    });

  }

  filterRooms(result: RawRoomsPackage) {

    this.filtered_rooms = Array.from(result.rooms);
    this.filtered = true;

  }
  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }

}
