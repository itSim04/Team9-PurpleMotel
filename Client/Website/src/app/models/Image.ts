import { KeyValue } from "@angular/common";

export interface Image {

  model_name: string,
  url: string;

}

export interface ImageResponse {
  status: string,
  data: {
    filename: string,
    base64: string;
  };

}

export interface ImagesResponse {

  data:
  {
    filename: string,
    base64: string;
  }[];
}

export interface ImagePackage {
  image: KeyValue<string, Image>;
}

export interface ImagesPackage {
  images: {
    filename: string,
    base64: string;
  }[];
}