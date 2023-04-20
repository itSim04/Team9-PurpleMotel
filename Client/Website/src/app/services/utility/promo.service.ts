import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { PromoCodeApplicationResponse } from 'src/app/models/PromoCode';
import { PromoDialogComponent } from '../dialogs/promo/promo.component';
import { UrlBuilderService } from './url-builder.service';


@Injectable({
  providedIn: 'root'
})
export class PromoDialogService {


  constructor (public dialog: MatDialog, private http: HttpClient, private url: UrlBuilderService) { }

  openDialog() {
    return this.dialog.open(PromoDialogComponent);
  }


  applyPromoCode(code: string) {

    const headers = this.url.generateHeader()

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

