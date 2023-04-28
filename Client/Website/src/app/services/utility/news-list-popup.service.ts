import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsListPopupComponent } from 'src/app/components/news/news-list-popup/news-list-popup.component';

@Injectable({
  providedIn: 'root'
})
export class NewsListPopupService {

  constructor(public dialog: MatDialog) { }

  openDialog<T>(id:string, title: string, body: string, date: string, likes: number, image: string){

    return this.dialog.open(NewsListPopupComponent, {
      data: {
        id: id,
        title: title,
        body: body,
        date: date,
        likes: likes,
        image: image
      }
    })
  }
}
