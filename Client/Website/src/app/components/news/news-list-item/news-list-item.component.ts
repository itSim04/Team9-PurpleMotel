import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent {

  @Input() news?: KeyValue<string, News>

}