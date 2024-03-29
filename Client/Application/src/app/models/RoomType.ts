import { KeyValue } from "@angular/common";

export interface RoomType {


  label: string, //A room can be many types; Single, Double, King...
  description: string, //A description for the type
  price: number, //Each type has a different price

  //Number of adults, adults with kids, or kids a room can hold
  adults_capacity: number,
  adults_with_kids_capacity: number,
  kids_capacity: number;



}

export interface RoomTypeResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RoomType;
  };
}

export interface RoomTypesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RoomType;
  }[];
}

export interface RoomTypePackage{
  room_type: KeyValue<string,RoomType>
}

export interface RoomTypesPackage{
  room_types: Map<string,RoomType>
}
