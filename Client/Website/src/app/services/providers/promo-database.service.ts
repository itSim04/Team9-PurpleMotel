import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PromoCodesPackage, PromoCodesResponse, PromoCode, PromoCodePackage, PromoCodeResponse, AppliedPromoCodes, EffectPromoCodes, EligiblityPromoCodes, FullPromoCodesPackage, FullPromoCodesResponse } from "src/app/models/PromoCode";
import { UrlBuilderService } from "../utility/url-builder.service";
import { Room, RoomAttributes } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { User, UserAttributes } from 'src/app/models/User';
import { UserType, UserTypeAttributes } from 'src/app/models/UserType';

@Injectable({
  providedIn: 'root'
})
export class PromoDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }


  getAllPromoCodes(): Observable<PromoCodesPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<PromoCodesResponse>(this.url.generateUrl('promocodes'), { headers: headers }).pipe(

        map((response: PromoCodesResponse): PromoCodesPackage => {

          const promo_codes = new Map<string, PromoCode>();

          response.data.forEach(promo_code => {

            promo_codes.set(promo_code.id, {
              ...promo_code.attributes,
              exhausted: false,
              concerned_everyone: false,
              concerned_everything: false,
              concerned_room_types: [],
              concerned_rooms: [],
              concerned_user_tiers: [],
              concerned_user_types: [],
              applied_users: [],
              concerned_users: []
            });



          });

          if (response.included) {

            response.included.forEach(data => {

              switch (data.type) {

                case 'AppliedPromoCodes':

                  promo_codes.get(data.attributes.promo_id)?.applied_users.push((data.attributes as AppliedPromoCodes).user_id);

                  break;

                case 'EligibilityPromoCodes':

                  const eligiblity_temp = promo_codes.get(data.attributes.promo_id);

                  if (eligiblity_temp) {

                    switch ((data.attributes as EligiblityPromoCodes).type) {

                      case 0:

                        eligiblity_temp.concerned_users.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 1:

                        eligiblity_temp.concerned_user_types.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 2:

                        eligiblity_temp.concerned_user_tiers.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 3:

                        eligiblity_temp.concerned_everyone = true;
                        break;

                    }

                  }

                  break;

                case 'EffectPromoCodes':

                  const effect_temp = promo_codes.get(data.attributes.promo_id);

                  if (effect_temp) {

                    switch ((data.attributes as EffectPromoCodes).type) {

                      case 0:

                        effect_temp.concerned_rooms.push((data.attributes as EffectPromoCodes).effect_id);
                        break;

                      case 1:

                        effect_temp.concerned_room_types.push((data.attributes as EffectPromoCodes).effect_id);
                        break;

                      case 2:

                        effect_temp.concerned_everything = true;
                        break;

                    }

                  }
              }
            });
          }

          console.log(promo_codes);

          return {

            promo_codes: promo_codes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getAllFullPromoCodes(): Observable<FullPromoCodesPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<FullPromoCodesResponse>(this.url.generateUrl('full-promocodes'), { headers: headers }).pipe(

        map((response: FullPromoCodesResponse): FullPromoCodesPackage => {

          const promo_codes = new Map<string, PromoCode>();
          const users = new Map<string, User>();
          const user_types = new Map<string, UserType>();
          const rooms = new Map<string, Room>();
          const room_types = new Map<string, RoomType>();

          console.log(response);

          response.data.forEach(promo_code => {

            promo_codes.set(promo_code.id, {
              ...promo_code.attributes,
              exhausted: false,
              concerned_everyone: false,
              concerned_everything: false,
              concerned_room_types: [],
              concerned_rooms: [],
              concerned_user_tiers: [],
              concerned_user_types: [],
              applied_users: [],
              concerned_users: []
            });



          });

          if (response.included) {

            response.included.forEach(data => {

              // console.log(data.type, data.attributes);

              switch (data.type) {

                case 'AppliedPromoCodes':

                  promo_codes.get((data.attributes as AppliedPromoCodes).promo_id)?.applied_users.push((data.attributes as AppliedPromoCodes).user_id);

                  break;

                case 'EligibilityPromoCodes':

                  const eligiblity_temp = promo_codes.get((data.attributes as EligiblityPromoCodes).promo_id);

                  if (eligiblity_temp) {
                    
                    console.log(data.attributes);
                    switch ((data.attributes as EligiblityPromoCodes).type) {

                      case 0:

                        eligiblity_temp.concerned_users.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 1:

                        eligiblity_temp.concerned_user_types.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 2:

                        eligiblity_temp.concerned_user_tiers.push((data.attributes as EligiblityPromoCodes).effect_id);
                        break;

                      case 3:

                        eligiblity_temp.concerned_everyone = true;
                        break;

                    }

                  }
                  // console.log(eligiblity_temp)

                  break;

                case 'EffectPromoCodes':

                  const effect_temp = promo_codes.get((data.attributes as EffectPromoCodes).promo_id);

                  if (effect_temp) {

                    switch ((data.attributes as EffectPromoCodes).type) {

                      case 0:

                        effect_temp.concerned_rooms.push((data.attributes as EffectPromoCodes).effect_id);
                        break;

                      case 1:

                        effect_temp.concerned_room_types.push((data.attributes as EffectPromoCodes).effect_id);
                        break;

                      case 2:

                        effect_temp.concerned_everything = true;
                        break;

                    }

                  }
                  break;

                case 'Users':

                  users.set(data.id, { ...(data.attributes as UserAttributes), type: data.relationships.user_type.data.id, permissions: new Map() });
                  break;

                case 'UserTypes':

                  user_types.set(data.id, { ...data.attributes as UserTypeAttributes, permissions: new Map() });
                  break;

                case 'Rooms':

                  rooms.set(data.id, { ...data.attributes as RoomAttributes, type: data.relationships.room_type.data.id, reviews: [], is_reviewed: false });
                  break;

                case 'RoomTypes':

                  room_types.set(data.id, data.attributes as RoomType);
                  break;




              }
            });
          }

          console.log(promo_codes);

          return {

            promo_codes: promo_codes,
            users: users,
            user_types: user_types,
            rooms: rooms,
            room_types: room_types

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOnePromoCode(id: string): Observable<PromoCodePackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<PromoCodeResponse>(this.url.generateUrl(`promocodes/${id}`), { headers: headers }).pipe(
        map((response: PromoCodeResponse): PromoCodePackage => {

          return {

            promo_code: {

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

  addNewPromoCode(promo_code: PromoCode) {

    const headers = this.url.generateHeader()

    try {

      return this.http.post<PromoCodeResponse>(this.url.generateUrl('promocodes'), promo_code, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyPromoCode(promo_code_id: string, promo_code: PromoCode) {

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`promocodes/${promo_code_id}`), promo_code, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deletePromoCode(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`promocodes/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}