import { UserType } from 'src/app/models/UserType';
import { User, UserAttributes } from 'src/app/models/User';
import { UserTypeAttributes } from './UserType';
import { KeyValue } from "@angular/common";
import { Activity } from "./Activity";


export interface RegistrationAttributes {

  
  start_date: string,
  end_date: string,


}

export interface Registration extends RegistrationAttributes {

  activity_id: string,
  user_id: string,

}

export interface RegistrationPackage {

  registration: KeyValue<string, Registration>;


}
export interface RegistrationsPackage {

  registrations: Map<string, Registration>;
  activities: Map<string, Activity>;
  users: Map<string, User>;
  user_types: Map<string, UserType>;


}

export interface RegistrationResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RegistrationAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      activity: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
  included?: {

    id: string;
    type: 'Users' | 'UserTypes'| 'Activities' ;
    attributes:  Activity | UserTypeAttributes | UserAttributes;

  }[];
}


export interface RegistrationsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: RegistrationAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      activity: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
  included?: {

    id: string;
    type: 'Users' | 'UserTypes' | 'Activities';
    attributes:  Activity | UserTypeAttributes | UserAttributes;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
      activity: {
        data: {
          id: string;
          type: string;
        };
      };
      activity_type: {
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
