import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RoomsResponse, Room, RoomResponse, RoomPackage, RoomsPackage } from "src/app/models/Room";
import { RoomTypeResponse, RoomType, RoomTypesResponse, RoomTypePackage, RoomTypesPackage } from "src/app/models/RoomType";
import { UrlBuilderService } from "src/app/services/url-builder.service";



@Injectable({
  providedIn: 'root'
})
export class RoomDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllRooms(): Observable<RoomsPackage> {

    try {

      return this.http.get<RoomsResponse>(this.url.generateUrl('rooms')).pipe(

        map((response: RoomsResponse): RoomsPackage => {

          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();


          response.data.forEach(room => {

            const roomType = room.relationships?.room_type?.data?.id;
            rooms.set(room.id, { ...room.attributes, type: roomType });

          });

          if (response.included) {

            response.included.forEach(room_type => {

              room_types.set(room_type.id, room_type.attributes);

            });

          }

          return {

            rooms: rooms,
            room_types: room_types

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }


  getOneRoom(id: string): Observable<RoomPackage> {

    try {

      return this.http.get<RoomResponse>(this.url.generateUrl(`rooms/${id}`)).pipe(
        map((response: RoomResponse): RoomPackage => {

          if (response.included) {

            return {

              room: {

                key: id,
                value: { ...response.data.attributes, type: response.data.relationships.room_type.data.id }

              },

              room_type: {

                key: response.data.relationships.room_type.data.id,
                value: response.included[0].attributes

              }

            };

          }
          throw new Error(`Foreign key Constraint failure: Room ${id}`);

        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  getAllRoomTypes(): Observable<RoomTypesPackage> {

    try {

      return this.http.get<RoomTypesResponse>(this.url.generateUrl('roomtypes')).pipe(

        map((response: RoomTypesResponse): RoomTypesPackage => {

          const roomtypes = new Map<string, RoomType>();

          response.data.forEach(room_type => {

            roomtypes.set(room_type.id, room_type.attributes);

          });

          return {

            room_types: roomtypes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneRoomType(id: string): Observable<RoomTypePackage> {

    try {

      return this.http.get<RoomTypeResponse>(this.url.generateUrl(`roomtypes/${id}`)).pipe(
        map((response: RoomTypeResponse): RoomTypePackage => {

          return {

            room_type: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewRoom(room: Room) {

    try {

      return this.http.post<RoomResponse>(this.url.generateUrl('rooms'), room).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyRoom(room_id: string, room: Room) {

    try {

      return this.http.put(this.url.generateUrl(`rooms/${room_id}`), room).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteRoom(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`rooms/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewRoomType(roomType: RoomType) {

    try {

      return this.http.post<RoomTypeResponse>(this.url.generateUrl('roomtypes'), roomType).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyRoomType(roomType_id: string, roomType: RoomType) {

    try {

      return this.http.put(this.url.generateUrl(`roomtypes/${roomType_id}`), roomType).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteRoomType(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`roomtypes/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

}
