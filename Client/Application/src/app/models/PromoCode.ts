import { KeyValue } from "@angular/common";
import { Room } from "./Room";
import { RoomType } from "./RoomType";
import { User } from "./User";
import { UserType } from "./UserType";

export interface PromoCodeAttributes {

  change: number,
  start_date: string,
  end_date: string;
  code: string;

}

export interface PromoCode extends PromoCodeAttributes {

  concerned_everyone: boolean;
  concerned_everything: boolean;
  concerned_users: string[];
  concerned_user_types: string[];
  concerned_user_tiers: string[];
  concerned_rooms: string[];
  concerned_room_types: string[];
  applied_users: string[];
  exhausted: boolean;


}

export interface EffectPromoCodes {

  effect_id: string;
  promo_id: string;
  type: number;


}
export interface EligiblityPromoCodes {

  effect_id: string;
  promo_id: string;
  type: number;


}
export interface AppliedPromoCodes {

  user_id: string;
  promo_id: string;


}

export interface PromoCodesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: PromoCodeAttributes;
  }[];
  included: {

    id: string,
    type: 'EligibilityPromoCodes' | 'AppliedPromoCodes' | 'EffectPromoCodes',
    attributes: EffectPromoCodes | AppliedPromoCodes | EligiblityPromoCodes;

  }[];

}

export interface FullPromoCodesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: PromoCodeAttributes;
  }[];
  included: {

    id: string,
    type: 'EligibilityPromoCodes' | 'AppliedPromoCodes' | 'EffectPromoCodes' | 'Users' | 'UserTypes' | 'Rooms' | 'RoomTypes',
    attributes: EffectPromoCodes | AppliedPromoCodes | EligiblityPromoCodes | User | UserType | Room | RoomType;
    relationships: {

      user_type: {
        data: {
          id: string,
          type: 'UserTypes';
        };
      },
      room_type: {
        data: {
          id: string,
          type: 'RoomTypes';
        },
      };

    };

  }[];

}

export interface PromoCodeResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: PromoCode;
  };
}

export interface PromoCodeApplicationResponse {
  status: string,
  data: number,
  included: {
    id: string;
    type: string;
    attributes: PromoCode;
  };
}

export interface PromoCodePackage {
  promo_code: KeyValue<string, PromoCode>;
}

export interface PromoCodesPackage {
  promo_codes: Map<string, PromoCode>;

}
export interface FullPromoCodesPackage {
  promo_codes: Map<string, PromoCode>;
  users: Map<string, User>;
  user_types: Map<string, UserType>;
  rooms: Map<string, Room>;
  room_types: Map<string, RoomType>;

}