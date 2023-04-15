import { OrderContains, OrderContainsAttributes } from './OrderContains';
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

  user_id: string,
  food: {
    id: string,
    quantity: number;
  }[];

}

export interface OrderPackage {

  order: KeyValue<string, Order>;


}
export interface OrdersPackage {

  order_contains: Map<string, OrderContains>;
  foods: Map<string, Food>;
  users: Map<string, User>;
  orders: Map<string, Order>;

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
    id: string,
    type: string,
    attributes: Order,
    relationships: {
      user: {
        data: {
          id: string,
          type: 'User';
        };
      };
    };
  }[];
  included: {
    id: string,
    type: 'OrderContains' | 'Foods' | 'Users',
    attributes: OrderContainsAttributes | FoodAttributes | UserAttributes,
    relationships: {
      user_type: {
        data: {
          id: string,
          type: string;
        };
      },
      food: {
        data: {
          id: string,
          type: string;
        };
      },
      order: {
        data: {
          id: string,
          type: string;
        };
      };
      food_category: {
        data: {
          id: string,
          type: string;
        };
      };
    };
  }[];
}