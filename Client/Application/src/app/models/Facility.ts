import { KeyValue } from "@angular/common";

export interface Facility {

    title: string, 
    description: string
  }

  export interface FacilitiesResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Facility;
    }[];
    
  }

  export interface FacilityResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Facility;
    };
  }

  export interface FacilityPackage{
    facility: KeyValue<string,Facility>
  }
  
  export interface FacilitiesPackage{
    facilities: Map<string,Facility>
  }