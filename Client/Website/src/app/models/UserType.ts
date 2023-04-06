import { KeyValue } from '@angular/common';


export interface UserType {
    label: string,
    description: string
}

export interface UserTypePackage {

    user: KeyValue<string, UserType>;


}
export interface UserTypesPackage {

    users: Map<string, UserType>;

}

export interface UserTypeResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: UserType;
    },
    authorisation?: {
        token: string,
        type: string;
    };

}
export interface UserTypesResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: UserType;
    }[];

}