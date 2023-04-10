import { KeyValue } from "@angular/common";

export interface News {

    label: string, //Label of a certain news item
    description: string, //Information about it
    available_quantity: number; //Current available quantity of said news item
    is_ingredient: boolean;
  
  }

  export interface NewsesResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: News;
    }[];
    
  }

  export interface NewsResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: News;
    };
  }

  export interface NewsPackage{
    news: KeyValue<string,News>
  }
  
  export interface NewsesPackage{
    newses: Map<string,News>
  }