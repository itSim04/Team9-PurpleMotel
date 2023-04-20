import { EffectPromoCodes, PromoCode, PromoCodeAttributes } from 'src/app/models/PromoCode';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RoomsResponse, Room, RoomResponse, RoomPackage, RoomsPackage } from "src/app/models/Room";
import { RoomTypeResponse, RoomType, RoomTypesResponse, RoomTypePackage, RoomTypesPackage } from "src/app/models/RoomType";
import { UrlBuilderService } from "../utility/url-builder.service";
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';



@Injectable({
  providedIn: 'root'
})
export class RoomDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllRooms(): Observable<RoomsPackage> {

    const headers = this.url.generateHeader()


    try {

      return this.http.get<RoomsResponse>(this.url.generateUrl('rooms'), { headers: headers }).pipe(

        map((response: RoomsResponse): RoomsPackage => {

          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();
          const promo_codes = new Map<string, PromoCode>();
          const effect_codes: EffectPromoCodes[] = [];

          response.data.forEach(room => {

            const roomType = room.relationships?.room_type?.data?.id;
            rooms.set(room.id, { ...room.attributes, type: roomType });

          });

          if (response.included) {

            response.included.forEach(data => {

              switch (data.type) {

                case 'RoomTypes':

                  room_types.set(data.id, data.attributes as RoomType);
                  break;

                case 'PromoCodes':

                  promo_codes.set(data.id, {
                    ...data.attributes as PromoCodeAttributes, concerned_everyone: false,
                    concerned_everything: false,
                    concerned_room_types: [],
                    concerned_rooms: [],
                    applied_users: [],
                    concerned_user_tiers: [],
                    concerned_user_types: [],
                    concerned_users: [],
                  });
                  break;

                case 'EffectPromoCodes':

                  effect_codes.push(data.attributes as EffectPromoCodes);



              }

            });

            effect_codes.forEach(code => {

              const temp = promo_codes.get(code.promo_id);
              if (temp) {

                switch (code.type) {

                  case 0:

                    temp.concerned_rooms.push(code.effect_id);
                    break;

                  case 1:

                    temp.concerned_room_types.push(code.effect_id);
                    break;

                  case 2:

                    temp.concerned_everything = true;
                    break;

                  default:

                    throw new Error('Invalid type');




                }

              }

            });

          }

          return {

            rooms: rooms,
            room_types: room_types,
            promo_codes: promo_codes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getPaginatedRooms(index: number, size: number): Observable<RoomsPackage> {

    const headers = this.url.generateHeader()


    try {

      return this.http.get<RoomsResponse>(this.url.generateUrl(`rooms?size=${size}&index=${index}`), { headers: headers }).pipe(

        map((response: RoomsResponse): RoomsPackage => {

          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();
          const promo_codes = new Map<string, PromoCode>();
          const effect_codes: EffectPromoCodes[] = [];

          response.data.forEach(room => {

            const roomType = room.relationships?.room_type?.data?.id;
            rooms.set(room.id, { ...room.attributes, type: roomType });

          });

          if (response.included) {

            response.included.forEach(data => {

              switch (data.type) {

                case 'RoomTypes':

                  room_types.set(data.id, data.attributes as RoomType);
                  break;

                case 'PromoCodes':

                  promo_codes.set(data.id, {
                    ...data.attributes as PromoCodeAttributes, concerned_everyone: false,
                    concerned_everything: false,
                    concerned_room_types: [],
                    concerned_rooms: [],
                    applied_users: [],
                    concerned_user_tiers: [],
                    concerned_user_types: [],
                    concerned_users: [],
                  });
                  break;

                case 'EffectPromoCodes':

                  effect_codes.push(data.attributes as EffectPromoCodes);



              }

            });

            effect_codes.forEach(code => {

              const temp = promo_codes.get(code.promo_id);
              if (temp) {

                switch (code.type) {

                  case 0:

                    temp.concerned_rooms.push(code.effect_id);
                    break;

                  case 1:

                    temp.concerned_room_types.push(code.effect_id);
                    break;

                  case 2:

                    temp.concerned_everything = true;
                    break;

                  default:

                    throw new Error('Invalid type');




                }

              }

            });

          }

          return {

            rooms: rooms,
            room_types: room_types,
            promo_codes: promo_codes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }


  getOneRoom(id: string): Observable<RoomPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<RoomResponse>(this.url.generateUrl(`rooms/${id}`), { headers: headers }).pipe(
        map((response: RoomResponse): RoomPackage => {

          if (response.included?.length) {

            return {

              room: {

                key: id,
                value: { ...response.data.attributes, type: response.data.relationships.room_type.data.id }

              },

              room_type: {

                key: response.data.relationships.room_type.data.id,
                value: response.included[0].attributes

              },

              promo_code: {

                key: '0',
                value: {
                  change: 0,
                  concerned_everyone: false,
                  concerned_everything: false,
                  concerned_room_types: [],
                  applied_users: [],
                  concerned_rooms: [],
                  concerned_user_tiers: [],
                  concerned_user_types: [],
                  concerned_users: [],
                  end_date: parseDate(new Date()),
                  start_date: parseDate(new Date()),

                }

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

    const headers = this.url.generateHeader()

    try {

      return this.http.get<RoomTypesResponse>(this.url.generateUrl('roomtypes'), { headers: headers }).pipe(

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

    const headers = this.url.generateHeader()

    try {

      return this.http.get<RoomTypeResponse>(this.url.generateUrl(`roomtypes/${id}`), { headers: headers }).pipe(
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

    const headers = this.url.generateHeader()

    try {

      return this.http.post<RoomResponse>(this.url.generateUrl('rooms'), room, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyRoom(room_id: string, room: Room) {

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`rooms/${room_id}`), room, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteRoom(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`rooms/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewRoomType(roomType: RoomType) {

    const headers = this.url.generateHeader()

    try {

      return this.http.post<RoomTypeResponse>(this.url.generateUrl('roomtypes'), roomType, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyRoomType(roomType_id: string, roomType: RoomType) {

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`roomtypes/${roomType_id}`), roomType, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteRoomType(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`roomtypes/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

}
