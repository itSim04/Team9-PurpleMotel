import { KeyValue } from "@angular/common";

export interface Image {

  model_name: string,
  url: string;

}

export interface ImagesResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Image;
  }[];

}

export interface ImageResponse {
  images:
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