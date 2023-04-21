import { UserType } from 'src/app/models/UserType';
import { User, UserAttributes } from 'src/app/models/User';
import { UserTypeAttributes } from './UserType';
import { KeyValue } from "@angular/common";
import { Room, RoomAttributes } from "./Room";
import { RoomType } from "./RoomType";

export interface BookingAttributes {

  
  check_in: string,
  end_date: string,
  exhausted: boolean;

}

export interface Booking extends BookingAttributes {

  room_id: string,
  user_id: string,

}

export interface BookingPackage {

  booking: KeyValue<string, Booking>;


}
export interface BookingsPackage {

  bookings: Map<string, Booking>;
  rooms: Map<string, Room>;
  users: Map<string, User>;
  user_types: Map<string, UserType>;
  room_types: Map<string, RoomType>;

}
export interface RawBookingsPackage {

  bookings: Map<string, Booking>;

}

export interface BookingResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: BookingAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      room: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
  included?: {

    id: string;
    type: 'Users' | 'UserTypes' | 'Rooms' | 'RoomTypes';
    attributes: RoomType | RoomAttributes | UserTypeAttributes | UserAttributes;

  }[];
}


export interface BookingsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: BookingAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      room: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
  included?: {

    id: string;
    type: 'Users' | 'UserTypes' | 'Rooms' | 'RoomTypes';
    attributes: RoomType | RoomAttributes | UserTypeAttributes | UserAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      room: {
        data: {
          id: string;
          type: string;
        };
      };
      room_type: {
        data: {
          id: string;
          type: string;
        };
      };
      user_type: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
}
