import { KeyValue } from '@angular/common';


export interface UserTypeAttributes {
    label: string,
    description: string;
}

export interface UserType extends UserTypeAttributes {

    permissions?: {

        'label': string,
        'permission': number,

    }[];

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
        attributes: UserTypeAttributes;
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
        attributes: UserTypeAttributes;
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