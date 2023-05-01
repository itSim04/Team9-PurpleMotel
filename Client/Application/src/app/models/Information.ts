import { KeyValue } from "@angular/common";

export interface Information {

  record: string, //Label of a certain announcement
  value: string, //Information about it

}

export interface InformationsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Information;
  }[];

}

export interface InformationResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Information;
  };
}

export interface InformationPackage {
  information: KeyValue<string, Information>;
}

export interface InformationsPackage {
  informations: Map<string, Information>;
}