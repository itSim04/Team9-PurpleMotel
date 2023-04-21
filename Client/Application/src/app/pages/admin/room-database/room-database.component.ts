import { Component, Input } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Room } from 'src/app/models/Room';
import { map, Observable } from 'rxjs';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from './room-database.service';

export function formatOccupancy(capacity: [number?, number?, number?]): string {
  const adults = capacity[0];
  const adults_with_kids = capacity[1];
  const kids = capacity[2];
  if (adults) {
    let result = "";
    result += `${adults} adult${adults == 1 ? '' : 's'}`;
    if (adults_with_kids) {
      result += ` or ${adults_with_kids} adult${adults_with_kids == 1 ? '' : 's'} + ${kids} ${kids == 1 ? 'child' : 'children'}`;
    }
    return result;
  } else {
    return "";
  }
}
export function formatPrice(price: number | undefined): string {

  if (price) {

    const numStr = price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return (numArr?.join(',')?.split('').reverse().join('') || numStr) + " USD";

  } else {

    return '';

  }
}

@Component({
  selector: 'app-room-database',
  templateUrl: './room-database.component.html',
  styleUrls: ['./room-database.component.scss']
})
export class RoomDatabaseComponent {

  constructor (private room_service: RoomDatabaseService) { }
  data_injection: DataInjection<Room> = {

    permission: 'room',
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

          format: (value) => (value as RoomType)?.label || 'Unauthorized',
          key: 'type'

        }
      }
    ],
    data_fetcher: undefined
  };
  extra_injection: DataInjection<RoomType> = {

    permission: 'room_type',
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

  dual_fetcher: () => Observable<[Map<string, Room>, Map<string, RoomType>, Map<string, unknown>[] | undefined]> = () => {

    return this.room_service.getAllRooms().pipe(
      map(result => {

        return [result.rooms, result.room_types, undefined];

      })
    );
  };



  change_injection: ChangeInjection<Room> = {

    side_panel: 'images',

    default_state: {
      is_reviewed: false,
      reviews: [],
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

    fields: [
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
        key: 'type',
        type: 'selection',
        choices: {
          link: true,
          format: (choice) => (choice as RoomType).label
        }
      },      
      {
        key: 'rating',
        type: 'number',
        readonly: true,
        condition: () => true
      },
      
    ],
    static_fields: [
      {
        key: 'price',
        link: {

          value: 'type',
          format: (value) => (value as RoomType).price.toString()

        }
      },
      {
        key: 'occupancy',
        link: {

          value: 'type',
          format: (value) => {

            const room_type = (value as RoomType);
            return formatOccupancy([room_type.adults_capacity, room_type.adults_with_kids_capacity, room_type.kids_capacity]);

          }
        }
      }

    ],

    toggle:
    {
      key: 'open',
      on_value: 'Close',
      off_value: 'Open'
    },

    add_service: room => this.room_service.addNewRoom(room),
    modify_service: (key, data) => this.room_service.modifyRoom(key, data),
    delete_service: key => this.room_service.deleteRoom(key),
    identifier: (data) => '' + data.label,
  };

  extra_change_injection: ChangeInjection<RoomType> = {

    side_panel: 'empty',

    default_state: {
      label: '',
      description: '',
      price: 0,
      kids_capacity: 0,
      adults_capacity: 0,
      adults_with_kids_capacity: 0,
    },

    data_type: 'Room Type',

    fields: [
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
        type: 'number',
        condition: (data: unknown) => {
          const room = data as number;
          console.log(room);
          return room >= 0;
        }
      },
      {
        key: 'adults_capacity',
        type: 'number',
        condition: (data: unknown) => {
          const room = data as number;
          return room > 0;
        }

      },
      {
        key: 'adults_with_kids_capacity',
        type: 'number',
        condition: (data: unknown) => {
          const room = data as number;
          return room >= 0;
        }
      }


    ],

    add_service: data => this.room_service.addNewRoomType(data),
    modify_service: (data, id) => this.room_service.modifyRoomType(data, id),
    delete_service: (id) => this.room_service.deleteRoomType(id),
    identifier: (data) => '' + data.label,
  };



}



