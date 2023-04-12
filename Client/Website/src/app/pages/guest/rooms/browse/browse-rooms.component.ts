import { RawRoomsPackage } from './../../../../models/Room';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/pages/admin/room-database/room-database.service';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.scss']
})
export class BrowseRoomsComponent implements OnInit, OnDestroy {

  rooms: Map<string, Room> = new Map();
  room_types: Map<string, RoomType> = new Map();

  filtered_rooms: Map<string, Room> = new Map();
  subscription?: Subscription;
  filtered = false;

  constructor (private room_service: RoomDatabaseService) { }

  ngOnInit(): void {

    this.subscription = this.room_service.getAllRooms().subscribe(data => {
      this.rooms = data.rooms;
      this.room_types = data.room_types;
      this.filtered_rooms = this.rooms;
    });

  }

  filterRooms(result: RawRoomsPackage) {

    this.filtered_rooms = result.rooms;
    this.filtered = true;

  }
  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }

}
