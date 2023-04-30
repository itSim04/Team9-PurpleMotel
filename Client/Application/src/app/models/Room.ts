import { EffectPromoCodes, PromoCodeAttributes } from './PromoCode';
import { PromoCode } from 'src/app/models/PromoCode';
import { KeyValue } from '@angular/common';
import { RoomType } from "./RoomType";

export interface Review {

  room_id: string,
  user_id: string,
  stars: number,
  date: string,
  title: string,
  content: string;

}

export interface IntelAttributes {

  quiet: number,
  smoke: number,
  view: number,
  wifi: number,
  tv: number,
  layout: number,
  proximity: number,
  bed: number,
  bathroom: number;


}

export interface Room extends RoomAttributes {
  type: string, //A room can be many types; Single, Double, King...
  reviews: Review[];
  is_reviewed: boolean;

  images: string[];

}

export interface RoomAttributes {
  description: string; //Detailed descriptin of the room
  label: string, //A title
  level: string, //Room Level 
  number: string, //Room Number
  open: boolean; //Is that room currently open or restricted?
  rating: number; //A rating out of  of said room


}

export interface RoomResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RoomAttributes;
    relationships: {
      room_type: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
  images: {

    rooms: {

      [id: string]: string[];
    };

  };
  included?: {

    id: string;
    type: 'RoomTypes' | 'Review' | 'PromoCodes';
    attributes: RoomType | Review | PromoCodeAttributes;

  }[];
}


export interface RoomsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RoomAttributes;
    relationships: {

      room_type: {

        data: {

          id: string;
          type: string;

        };
      };
    };
  }[];
  included?: {

    id: string;
    type: 'PromoCodes' | 'RoomTypes' | 'EffectPromoCodes' | 'Review';
    attributes: RoomType | PromoCodeAttributes | EffectPromoCodes | Review;

  }[];
  images: {

    rooms: {

      [id: string]: string[];
    };

  };
}

export interface RoomPackage {
  room: KeyValue<string, Room>;
  room_type: KeyValue<string, RoomType>;
  promo_code: KeyValue<string, PromoCode>;
}

export interface RoomsPackage {
  rooms: Map<string, Room>;
  room_types: Map<string, RoomType>;
  promo_codes: Map<string, PromoCode>;
}
export interface RawRoomsPackage {
  rooms: Map<string, Room>;
}