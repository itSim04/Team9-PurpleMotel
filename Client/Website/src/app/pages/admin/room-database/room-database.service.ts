import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RoomsResponse, Room, RoomResponse, RoomPackage, RoomsPackage } from "src/app/models/Room";
import { RoomType } from "src/app/models/RoomType";
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
          

          response.data.forEach(room => {

            rooms.set(room.id, {...room.attributes, type: room.relationships.room_type.data.id});


          });

          return {

            rooms: rooms
          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  /*getAllRooms(): Observable<RoomsPackage> {
    try {
      return this.http.get<RoomsResponse>(this.url.generateUrl('rooms')).pipe(
        map((response: RoomsResponse): RoomsPackage => {
          const rooms = new Map<string, Room>();
  
          // Create a Map of RoomType objects
          const roomTypes = new Map<string, RoomType>();
          response.included?.forEach((roomType: RoomType) => {
            roomTypes.set(roomType.id, roomType);
          });
  
          response.data.forEach(roomData => {
            const room = roomData.attributes;
            const roomId = roomData.id;
            const roomType = roomTypes.get(roomData.relationships.room_type.data.id);
            
            // Merge the RoomType object into the Room object
            rooms.set(roomId, {...room, type: roomType?.name});
          });
  
          return {
            rooms: rooms,
            room_types: roomTypes
          };
        })
      );
    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  }*/
  
  

  getOneRoom(id: string): Observable<RoomPackage> {

    try {

      return this.http.get<RoomResponse>(this.url.generateUrl(`rooms/${id}`)).pipe(
        map((response: RoomResponse): RoomPackage => {

          return {

            room: {

              key: response.data.id,
              value: {...response.data.attributes, type: response.data.relationships.room_type.data.id}

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
}
