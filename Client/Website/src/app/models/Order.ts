import { UserType } from 'src/app/models/UserType';
import { User, UserAttributes } from 'src/app/models/User';
import { UserTypeAttributes } from './UserType';
import { KeyValue } from "@angular/common";
import { Food, FoodAttributes } from "./Food";

export interface OrderAttributes {

  date: string,
  status: string;

}

export interface Order extends OrderAttributes {

  food_id: string,
  user_id: string,

}

export interface OrderPackage {

  order: KeyValue<string, Order>;


}
export interface OrdersPackage {

  orders: Map<string, Order>;
  foods: Map<string, Food>;
  users: Map<string, User>;
  user_types: Map<string, UserType>;

}

export interface OrderResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: OrderAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      food: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
  included?: {

    id: string;
    type: 'Users' | 'UserTypes' | 'Foods';
    attributes: FoodAttributes | UserTypeAttributes | UserAttributes;

  }[];
}


export interface OrdersResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: OrderAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      food: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
  included?: {

    id: string;
    type: 'Users' | 'UserTypes' | 'Foods' ;
    attributes: FoodAttributes | UserTypeAttributes | UserAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      food: {
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