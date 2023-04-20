import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';

@Component({
  selector: 'app-room-overview',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.scss']
})
export class RoomOverviewComponent implements OnInit {

  loading = false;
  room?: KeyValue<string, Room>;
  room_type?: KeyValue<string, RoomType>;

  constructor (private route: ActivatedRoute, private room_service: RoomDatabaseService) { }

  ngOnInit() {

    const key = this.route.snapshot.paramMap.getAll('id')[0];

    const room = localStorage.getItem('temp_room_item');
    const room_type = localStorage.getItem('temp_room_type_item');

    localStorage.removeItem('temp_room_item');
    localStorage.removeItem('temp_room_type_item');

    if (room && room_type) {

      console.log("Room already exists");
      this.room = JSON.parse(room) as KeyValue<string, Room>;
      this.room_type = JSON.parse(room_type) as KeyValue<string, RoomType>;


    } else {

      this.loading = true;

      console.log("Room does not exist");

      this.room_service.getOneRoom(key).subscribe(room => {

        this.loading = false;
        this.room = {

          key: key,
          value: room.room.value

        };

        this.room_type = {

          key: room.room_type.key,
          value: room.room_type.value

        };


      });
    }
  }

}
