import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Room } from 'src/app/models/Room';
import { RoomDatabaseService } from './room-database.service';
import { map, Observable } from 'rxjs';
import { RoomType } from 'src/app/models/RoomType';

@Component({
  selector: 'app-room-database',
  templateUrl: './room-database.component.html',
  styleUrls: ['./room-database.component.scss']
})
export class RoomDatabaseComponent {
constructor (private room_service: RoomDatabaseService) { }

  data_injection: DataInjection<Room> = {
    title: 'Room',
    displayed_columns: [
      {
        key: 'label'
      },
      {
        key: 'number'
      },
      {
        key: 'level'
      },
      {
        key: 'open',
        type: 'boolean'
      },
      {
        key: 'rating',
        type: 'rating'
      },
      {
        key: 'type',
        type: 'link',
        link: {

          format: (value) => (value as RoomType).label,
          key: 'type'

        }
      }
    ],
    data_fetcher: undefined
  };
  extra_injection: DataInjection<RoomType> = {
    title: 'Room Type',
    displayed_columns: [
      {
        key: 'label'
      },
      {
        key: 'price',
        type: 'price'
      },
      {
        key: 'adults_capacity',
        header_alt: 'Capacity',
        type: 'custom',
        custom: (data) => `${data.adults_capacity} Adults`
      },

      {
        key: 'adults_with_kids_capacity',
        header_alt: 'Capacity 2',
        type: 'custom',
        custom: (data) => `${data.adults_with_kids_capacity} Adults + ${data.kids_capacity} Kids`
      },
    ],
    data_fetcher: undefined
  };

  dual_fetcher: () => Observable<[Map<string, Room>, Map<string, RoomType>]> = () => {

    return this.room_service.getAllRooms().pipe(
      map(result => {

        return [result.rooms, result.room_types];

      })
    );
  };

  
  change_injection: ChangeInjection<Room> = {
    default_state:{
      label: '',
      description: '',
      number: '',
      level: '',
      type: '',
      rating: 0,
      image_path: '',
      open: true
    },

    //side_panel: 'empty',

    data_type: 'room',

    fields:[
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      },
      {
        key: 'number',
        type: 'text'
      },
      {
        key: 'level',
        type: 'text'
      },
      {
        key: 'type',
        type: 'text'
      },
      {
        key: 'rating',
        type: 'number'
      },
      {
        key: 'image_path',
        type: 'text'
      },
      {
        key: 'open',
        type: 'choices'
      }

    ],

    toggle:
      {
        key: 'open',
        on_value: 'Is open',
        off_value: 'Is not open'
      },
    
    add_service: room => this.room_service.addNewRoom(room),
    modify_service: (key,data) => this.room_service.modifyRoom(key, data),
    delete_service: key => this.room_service.deleteRoom(key),
    identifier: (data) => '' + data.label,
  }

}



