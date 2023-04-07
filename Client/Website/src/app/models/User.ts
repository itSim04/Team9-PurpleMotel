import { KeyValue } from '@angular/common';



export interface UserCredentials {

    email: string,
    password: string;


}
export interface UserInformation {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    gender: number,
    phone: string,
    date_of_birth: string;
}
export interface UserInjection extends UserInformation {
    tier: string,
}
export interface UserAttributes {

    first_name: string,
    last_name: string,
    email: string;
    gender: string,
    phone: string,
    language: string,
    date_of_birth: string,
    tier: string,
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