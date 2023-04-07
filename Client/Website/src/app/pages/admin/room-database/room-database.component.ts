import { Component } from '@angular/core';
import { DataInjection } from 'src/app/models/Database';
import { Room } from 'src/app/models/Room';
import { RoomDatabaseService } from './room-database.service';
import { map } from 'rxjs';

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
    data_fetcher:()=>this.room_service.getAllRooms().pipe(map(data => data.rooms))
  }
  constructor(private room_service: RoomDatabaseService){}
}
