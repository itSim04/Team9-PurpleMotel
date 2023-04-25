import { KeyValue } from "@angular/common";


export interface Language extends LanguageAttributes {

  language: string

}
export interface LanguageAttributes {
  
  term: string,
  value: string;

}

export interface LanguageResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: LanguageAttributes;
    relationships: {
      language: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
}


export interface LanguagesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: LanguageAttributes;
    relationships: {

      language: {

        data: {

          id: string;
          type: string;

        };
      };
    };
  }[];
}

export interface LanguagePackage {
  language: KeyValue<string, Language>;
}

export interface LanguagesPackage {
  languages: Map<string, Language>;
}