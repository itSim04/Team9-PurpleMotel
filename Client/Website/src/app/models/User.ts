import { PromoCode, PromoCodeAttributes } from 'src/app/models/PromoCode';
import { KeyValue } from '@angular/common';
import { Food, FoodAttributes } from './Food';
import { Order, OrderAttributes } from './Order';
import { Room, RoomAttributes, Review } from './Room';
import { Booking, BookingAttributes } from './Booking';
import { RoomType } from './RoomType';
import { Activity, ActivityAttributes } from './Activity';
import { OrderContainsAttributes } from './OrderContains';
import { Stock } from './Stock';
import { IngredientAttributes } from './Ingredient';
import { Registration, RegistrationAttributes } from './Registration';



export interface UserCredentials {

    email: string,
    password: string;


}

export interface UserChange {

    first_name: string,
    last_name: string,
    email: string,
    gender: number,
    phone: string,
    date_of_birth: string;

}
export interface UserInformation extends UserChange {
    password: string,
}
export interface UserInjection extends UserInformation {
    tier: string,
}
export interface UserAttributes {

    first_name: string,
    last_name: string,
    email: string;
    gender: number,
    phone: string,
    language: string,
    date_of_birth: string,
    tier: string,

    email_verified_at?: string;
}

export interface User extends UserAttributes {

    permissions: Map<string, number>;
    type: string;

}

export interface UserPackage {

    user: KeyValue<string, UserAttributes>;


}
export interface UsersPackage {

    users: Map<string, User>;

}

export interface UserResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: UserAttributes;
        relationships: {
            user_type: {
                data: {
                    id: string;
                    type: string;
                };
            };
        };
    },
    included?: {

        id: string,
        type: string,
        attributes: {

            label: string,
            concerned_party: string,
            is_singular: boolean,
            read: boolean,
            write: boolean,
            delete: boolean;

        };

    };
    authorisation?: {
        token: string,
        type: string;
    };
    permissions?: {

        room?: number[];
        user?: number[];
        stock?: number[];
        user_type?: number[];
        room_type?: number[];
        language?: number[];
        booking?: number[];

    };

}
export interface UsersResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: UserAttributes;
        relationships: {
            user_type: {
                data: {
                    id: string;
                    type: string;
                };
            };
        };
    }[];

    included?: {

        id: string,
        type: string,
        attributes: {

            label: string,
            concerned_party: string,
            is_singular: boolean,
            read: boolean,
            write: boolean,
            delete: boolean;

        };

    }[];

}
export function extractSessionUser() {

    try {

        const json = localStorage.getItem('user');

        if (json) {

            return JSON.parse(json) as User;

        } else {

            return undefined;

        }


    } catch (e: unknown) {

        return undefined;

    }


}

export interface ProfileResponse {


    status: string,
    data: {
        id: string,
        type: 'Foods' | 'Orders' | 'Review' | 'Rooms' | 'RoomTypes' | 'Booking' | 'OrderContains' | 'Stocks' | 'Ingredient' | 'Registration' | 'Activities' | 'PromoCodes',
        attributes: FoodAttributes | OrderAttributes | Review | RoomAttributes | BookingAttributes | RoomType | OrderContainsAttributes | Stock | IngredientAttributes | ActivityAttributes | RegistrationAttributes | PromoCodeAttributes,
        relationships: {
            food_category: {
                data: {
                    id: string,
                    type: string;
                };
            },
            user: {
                data: {
                    id: string,
                    type: string;
                };
            },
            room_type: {
                data: {
                    id: string,
                    type: string;
                };
            },
            room: {
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
            },
            food: {
                data: {
                    id: string,
                    type: string;
                };
            },
            stock: {
                data: {
                    id: string,
                    type: string;
                };
            },
            promo: {
                data: {
                    id: string,
                    type: string;
                };
            },
            activity: {
                data: {
                    id: string,
                    type: string;
                };
            };
        };
    }[];

    images: {

        rooms: {

            [id: string]: string[];
        };

        food: {

            [id: string]: string[];
        };
        
        activity: {
            
            [id: string]: string[];

        }



    };




}

export interface ProfilePackage {
    orders: Map<string, Order>;
    bookings: Map<string, Booking>;
    rooms: Map<string, Room>;
    room_types: Map<string, RoomType>;
    stocks: Map<string, Stock>;
    foods: Map<string, Food>;
    activities: Map<string, Activity>;
    registrations: Map<string, Registration>;
    reviews: Map<string, Review>;
    promo: Map<string, PromoCode>;

}