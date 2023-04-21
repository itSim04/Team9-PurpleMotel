import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface NewsPopup{
  id: string;
  title: string;
  body: string;
  date: string;
  likes: number;
}

@Component({
  selector: 'app-news-list-popup',
  templateUrl: './news-list-popup.component.html',
  styleUrls: ['./news-list-popup.component.scss'],
})
export class NewsListPopupComponent  implements OnInit {

  id: string;
  title: string;
  body: string;
  date: string;
  likes: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: NewsPopup, private dialog: MatDialogRef<NewsListPopupComponent>){
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.date = data.date;
    this.likes = data.likes;
  }

  ngOnInit() {}

}