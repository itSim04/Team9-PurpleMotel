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

      return this.http.get<any>(this.url.generateUrl(`information`), { headers: headers }).pipe(

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

  
  browseImages(model_name: string,  id: string): Observable<ImagesResponse> {

    try {

      return this.http.get<ImagesResponse>(this.url.generateUrl(`browse-images?model_name=${model_name}&id=${id}`));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }


  storeImage(image: string, model_name: string,  id: string) {

    try {

      return this.http.post<ImageResponse>(this.url.generateUrl('store-images'), {

        image: image,
        model_name: model_name,
        id: id

      });

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteImage(filename: string, model_name: string,  id: string) {

    try {

      return this.http.get<ImagesResponse>(this.url.generateUrl(`delete-images?filename=${filename}&model_name=${model_name}&id=${id}`));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyImage(image: string, model_name: string, id: string, filename: string) {

    try {

      return this.http.post<ImagesResponse>(this.url.generateUrl('modify-images'), {

        image: image,
        model_name: model_name,
        id: id,
        filename: filename

      });

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}


