import { Component } from '@angular/core';
import { DataInjection } from 'src/app/models/Database';
import { Room } from 'src/app/models/Room';
import { RoomDatabaseService } from './room-database.service';
import { map } from 'rxjs';
import { RoomType } from 'src/app/models/RoomType';

@Component({
  selector: 'app-room-database',
  templateUrl: './room-database.component.html',
  styleUrls: ['./room-database.component.scss']
})
export class RoomDatabaseComponent {

  data_injection: DataInjection<Room> = {
    title: 'Room',
    displayed_columns:[
      {
        key:'label'
      },
      {
        key:'description'
      },
      {
        key:'number'
      },
      {
        key:'level'
      },
      {
        key:'open', type:'boolean'
      },
      {
        key:'rating'
      },
      {
        key:'type'
      }
    ],
    data_fetcher:()=>this.room_service.getAllRooms().pipe(map(data => data.rooms)),
  }
  extra_injection: DataInjection<RoomType> = {
    title: 'Room',
    displayed_columns:[
      {
        key:'label'
      },
      {
        key:'description'
      },
      {
        key:'price'
      },
      {
        key:'adults_capacity'
      },
      {
        key:'adults_with_kids_capacity'
      },
      {
        key:'kids_capacity'
      }
    ],
    data_fetcher:()=>this.room_service.getAllRoomTypes().pipe(map(data => data.room_types))
  }
  constructor(private room_service: RoomDatabaseService){}
  
}



