import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
})
export class NewsListItemComponent  implements OnInit {

  @Input() news!: KeyValue<string, News>;
  
  constructor() { }
  
  // openPopup() {

  //   const dialogRef = this.news_dialog.openDialog()

  // }


  ngOnInit() {}

}