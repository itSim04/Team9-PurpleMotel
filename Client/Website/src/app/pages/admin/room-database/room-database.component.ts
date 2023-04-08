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

  constructor (private room_service: RoomDatabaseService) {}
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

    data_type: 'Room',

    standalone_field: {

      key: 'description',
      type: 'text'

    },

    fields:[
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'number',
        type: 'positive_digits_string'
      },
      {
        key: 'level',
        type: 'digits_string'
      },
      {
        key: 'rating',
        type: 'number'
      },
      {
        key: 'open',
        type: 'choices'
      },
      {
        key: 'type',
        type: 'selection',
      }

    ],

    toggle:
      {
        key: 'open',
        on_value: 'Close',
        off_value: 'Open'
      },
    
    add_service: room => this.room_service.addNewRoom(room),
    modify_service: (key,data) => this.room_service.modifyRoom(key, data),
    delete_service: key => this.room_service.deleteRoom(key),
    identifier: (data) => '' + data.label,
  };

  extra_change_injection: ChangeInjection<RoomType>  = {
    default_state:{
      label: '',
      description: '',
      price: 0,
      kids_capacity: 0,
      adults_capacity: 0,
      adults_with_kids_capacity: 0,
    },

    //side_panel: 'empty',

    data_type: 'Room Type',

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
        key: 'price',
        type: 'number'
      },
      {
        key: 'kids_capacity',
        type: 'number'
      },
      {
        key: 'adults_capacity',
        type: 'number'
      },
      {
        key: 'adults_with_kids_capacity',
        type: 'number'
      }


    ],

    add_service: data => this.room_service.addNewRoomType(data),
    modify_service: (data, id) => this.room_service.modifyRoomType(data, id),
    delete_service: (id) => this.room_service.deleteRoomType(id),
    identifier: (data) => '' + data.label,
  };
  
  

}



