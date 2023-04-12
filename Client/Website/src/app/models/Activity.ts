import { KeyValue } from "@angular/common";

export interface Activity {

    title: string, //Label of a certain stock item
    description: string, //Information about it
    capacity: number, //Current available quantity of said stock item
    price: number,
    start_date: string,
    end_date: string
  
  }

  export interface ActivitiesResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Activity;
    }[];
    
  }

  export interface ActivityResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Activity;
    };
  }

  export interface ActivityPackage{
    activity: KeyValue<string,Activity>
  }
  
  export interface ActivitiesPackage{
    activities: Map<string,Activity>
  }