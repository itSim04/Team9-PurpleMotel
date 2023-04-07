import { KeyValue } from "@angular/common";
import { Room, RoomAttributes } from "./Room";
import { RoomType } from "./RoomType";

export interface BookingAttributes {

  
  check_in: Date,
  end_date: Date,
  exhausted: boolean;

}

export interface Booking extends BookingAttributes {

  room_id?: string,
  user_id?: number,

}

export interface BookingPackage {

  booking: KeyValue<string, Booking>;


}
export interface BookingsPackage {

  bookings: Map<string, Booking>;

}

export interface BookingResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: BookingAttributes;
    relationships: {
      room_type: {
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
    type: string;
    attributes: RoomType | RoomAttributes;

  }[];
}


export interface BookingsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: BookingAttributes;
    relationships: {
      rltp: {
        data: {
          id: string;
          type: string;
        };
      };
    }[];
  }[];
  included?: {

    id: string;
    type: string;
    attributes: RoomType | RoomAttributes;

  }[];
}
