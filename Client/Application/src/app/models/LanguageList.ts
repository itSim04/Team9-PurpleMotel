import { KeyValue } from "@angular/common";

export interface LanguageList {


  language_name: string,
  code_name: string 

}

export interface LanguageListResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: LanguageList;
  };
}

export interface LanguageListsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: LanguageList;
  }[];
}

export interface LanguageListPackage{
  language_list: KeyValue<string,LanguageList>
}

export interface LanguageListsPackage{
  language_lists: Map<string,LanguageList>
}
