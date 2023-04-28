import { KeyValue } from "@angular/common";

export interface News extends NewsAttributes {

  is_liked: boolean; //whether the user has liked the news or not
  likes: Like[];

  image: string;

}
export interface NewsAttributes {

  title: string, //title of a certain news feed
  body: string, //Information about it
  date: string; //the date the feed was created
  likes_number: number; //the number of liked a feed has

}

export interface SingleNewsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: NewsAttributes;
  };
  included: {

    id: string;
    type: string;
    attributes: Like;

  }[];
  images: {

    news: {

      [id: string]: string[];

    };

  };

}

export interface Like {

  news_id: string,
  user_id: string;

}

export interface NewsResponse {

  status: string,
  data: {
    id: string;
    type: string;
    attributes: NewsAttributes;
  }[];
  included: {

    id: string;
    type: string;
    attributes: Like;
  }[];
  images: {

    news: {

      [id: string]: string[];

    };

  };

}

export interface NewsPackage {
  news: Map<string, News>;
}

export interface SingleNewsPackage {
  news: KeyValue<string, News>;
}