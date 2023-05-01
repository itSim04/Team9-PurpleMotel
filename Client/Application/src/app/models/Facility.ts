import { KeyValue } from "@angular/common";

export interface FacilityAttributes {

  title: string,
  description: string;
}

export interface Facility extends FacilityAttributes {

  image: string[];

}

export interface FacilitiesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: FacilityAttributes;
  }[];
  images: {

    facilities: {

      [id: string]: string[];
    
    };

  };

}

export interface FacilityResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: FacilityAttributes;
  };
  images: {

    facilities: {

      [id: string]: string[];
    };
  };
}

export interface FacilityPackage {
  facility: KeyValue<string, Facility>;
}

export interface FacilitiesPackage {
  facilities: Map<string, Facility>;
}