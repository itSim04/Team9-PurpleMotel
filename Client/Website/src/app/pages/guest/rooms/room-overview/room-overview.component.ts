import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/pages/admin/room-database/room-database.service';

@Component({
  selector: 'app-room-overview',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.scss']
})
export class RoomOverviewComponent {

  room?: KeyValue<string, Room>;
  room_type?: KeyValue<string, RoomType>;
  constructor(private route: ActivatedRoute, private room_service: RoomDatabaseService) {

    const key = route.snapshot.paramMap.getAll('id')[0];
    room_service.getOneRoom(key).subscribe(room => {

      this.room = {

        key: room.room.key,
        value: room.room.value

      };

      this.room_type = {

        key: room.room_type.key,
        value: room.room_type.value

      };


    });
  }

}
