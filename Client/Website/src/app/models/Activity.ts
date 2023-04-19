import { Registration, RegistrationAttributes } from './Registration';
import { KeyValue } from "@angular/common";

export interface ActivityAttributes {

  title: string, //Label of a certain stock item
  description: string, //Information about it
  capacity: number, //Current available quantity of said stock item
  price: number,
  start_date: string,
  end_date: string;

}

export interface Activity extends ActivityAttributes {

  registrations: Registration[]

}

export interface ActivitiesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: ActivityAttributes;
  }[];

  included: {
    id: string,
    type: string,
    attributes: RegistrationAttributes,
    relationships: {
      activity: {
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
      };
    };
  }[];

}

export interface ActivityResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: ActivityAttributes;
  };
  included: {
    id: string,
    type: string,
    attributes: RegistrationAttributes,
    relationships: {
      activity: {
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
      };
    };
  }[];
}

export interface ActivityPackage {
  activity: KeyValue<string, Activity>;
}

export interface ActivitiesPackage {
  activities: Map<string, Activity>;
  registrations: Map<string, Registration>;
}