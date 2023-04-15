import { KeyValue } from "@angular/common";

export interface News {

    title: string, //title of a certain news feed
    body: string, //Information about it
    date: string; //the date the feed was created
    likes: number; //the number of liked a feed has
  
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