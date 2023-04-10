import { KeyValue } from '@angular/common';
import { RoomType } from "./RoomType";

export interface Room extends RoomAttributes {
  type: string, //A room can be many types; Single, Double, King...

}

export interface RoomAttributes {
  description: string; //Detailed descriptin of the room
  label: string, //A title
  level: string, //Room Level 
  number: string, //Room Number
  open: boolean; //Is that room currently open or restricted?
  rating: number; //A rating out of  of said room
  image_path: string;


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
  included?: {

    id: string;
    type: string;
    attributes: RoomType;

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
    type: string;
    attributes: RoomType;

  }[];
}

export interface RoomPackage{
  room: KeyValue<string,Room>;
  room_type: KeyValue<string,RoomType>;
}

export interface RoomsPackage{
  rooms: Map<string,Room>;
  room_types: Map<string,RoomType>;
}