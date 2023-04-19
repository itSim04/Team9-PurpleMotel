import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsListPopupComponent } from './news-list-popup.component';

@Injectable({
  providedIn: 'root'
})
export class NewsListPopupService {

  constructor(public dialog: MatDialog) { }

  openDialog<T>(id:string, title: string, body: string, date: string, likes: number){

    return this.dialog.open(NewsListPopupComponent, {
      data: {
        id: id,
        title: title,
        body: body,
        date: date,
        likes: likes
      }
    })
  }
}
