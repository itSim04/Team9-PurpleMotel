import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PromoCodesResponse, PromoCode, PromoCodeResponse, PromoCodePackage, PromoCodesPackage } from "src/app/models/PromoCode";
import { UrlBuilderService } from "src/app/services/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class PromoCodeDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }


  getAllPromoCodes(): Observable<PromoCodesPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<PromoCodesResponse>(this.url.generateUrl('promo_codes'), { headers: headers }).pipe(

        map((response: PromoCodesResponse): PromoCodesPackage => {

          const promo_codes = new Map<string, PromoCode>();

          response.data.forEach(promo_code => {

            promo_codes.set(promo_code.id, promo_code.attributes);

          });

          return {

            promo_codes: promo_codes

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOnePromoCode(id: string): Observable<PromoCodePackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<PromoCodeResponse>(this.url.generateUrl(`promo_codes/${id}`), { headers: headers }).pipe(
        map((response: PromoCodeResponse): PromoCodePackage => {

          return {

            promo_code: {

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

  addNewPromoCode(promo_code: PromoCode) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.post<PromoCodeResponse>(this.url.generateUrl('promo_codes'), promo_code, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyPromoCode(promo_code_id: string, promo_code: PromoCode) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.put(this.url.generateUrl(`promo_codes/${promo_code_id}`), promo_code, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deletePromoCode(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.delete(this.url.generateUrl(`promo_codes/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}