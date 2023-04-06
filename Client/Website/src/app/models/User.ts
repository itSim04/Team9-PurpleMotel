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
export interface User {

    first_name: string,
    last_name: string,
    email: string;
    gender: string,
    phone: string,
    language: string,
    date_of_birth: string,
    tier: string,
}

export interface UserPackage {

    user: KeyValue<string, User>


}
export interface UsersPackage {

    users: Map<string, User>

}

export interface UserResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: User;
    },
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
        attributes: User;
    }[]

}