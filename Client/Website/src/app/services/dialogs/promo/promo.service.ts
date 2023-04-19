import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromoComponent } from './promo.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { PromoCodeApplicationResponse } from 'src/app/models/PromoCode';
import { UrlBuilderService } from '../../url-builder.service';


@Injectable({
  providedIn: 'root'
})
export class PromoService {


  constructor (public dialog: MatDialog, private http: HttpClient, private url: UrlBuilderService) { }

  openDialog(title: string, body: string, button_true: string, button_false: string) {
    return this.dialog.open(PromoComponent, {
      data: {
        title: title,
        body: body,
        button_true: button_true,
        button_false: button_false
      },
    });
  }

  applyPromoCode(code: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<PromoCodeApplicationResponse>(this.url.generateUrl(`applyPromo/${code}`), { headers: headers }).pipe(

        map((response: PromoCodeApplicationResponse): number => {


          return response.data; // return the status code as a number

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }
  }

}

