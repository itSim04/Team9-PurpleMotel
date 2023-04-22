import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { InformationsPackage, InformationsResponse, Information, InformationPackage, InformationResponse } from "src/app/models/Information";
import { UrlBuilderService } from "../utility/url-builder.service";
import { Image, ImagePackage, ImageResponse, ImagesPackage, ImagesResponse } from "src/app/models/Image";



@Injectable({
  providedIn: 'root'
})
export class InformationDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getTerms(): Observable<any> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<any>(this.url.generateUrl(`information`),  { headers: headers }).pipe(

        map((response: any): any => {

          return response.data;

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  getAllInformations(): Observable<InformationsPackage> {

    try {

      return this.http.get<InformationsResponse>(this.url.generateUrl('informations')).pipe(

        map((response: InformationsResponse): InformationsPackage => {

          const informations = new Map<string, Information>();

          response.data.forEach(information => {

            informations.set(information.id, information.attributes);

          });

          return {

            informations: informations

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneInformation(id: string): Observable<InformationPackage> {

    try {

      return this.http.get<InformationResponse>(this.url.generateUrl(`informations/${id}`)).pipe(
        map((response: InformationResponse): InformationPackage => {

          return {

            information: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewInformation(information: Information) {

    try {

      return this.http.post<InformationResponse>(this.url.generateUrl('informations'), information).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyInformation(information_id: string, information: Information) {

    try {

      return this.http.put(this.url.generateUrl(`informations/${information_id}`), information).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteInformation(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`informations/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  getAlllImages(): Observable<ImagesPackage> {

    try {

      return this.http.get<ImagesResponse>(this.url.generateUrl('images')).pipe(

        map((response: ImagesResponse): ImagesPackage => {

          const images = new Map<string, Image>();

          response.data.forEach(image => {

            images.set(image.id, image.attributes);

          });

          return {

            images: images

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneImage(id: string): Observable<ImagePackage> {

    try {

      return this.http.get<ImageResponse>(this.url.generateUrl(`images/${id}`)).pipe(
        map((response: ImageResponse): ImagePackage => {

          return {

            image: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewImage(image: Image) {

    try {

      return this.http.post<ImageResponse>(this.url.generateUrl('images'), image).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyImage(image_id: string, image: Image) {

    try {

      return this.http.put(this.url.generateUrl(`images/${image_id}`), image).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteImage(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`images/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}


