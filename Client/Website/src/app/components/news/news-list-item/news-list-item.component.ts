import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { News } from 'src/app/models/News';
import { NewsListPopupService } from 'src/app/services/utility/news-list-popup.service';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})

export class NewsListItemComponent {
  @Input() news!: KeyValue<string, News>

  image = Math.random() > 0.5 ? "../../../../assets/news-sample1.png" : "../../../../assets/news-sample2.png"

  constructor(private news_dialog: NewsListPopupService){ }

  openPopup() {

    const dialogRef = this.news_dialog.openDialog(this.news?.key, this.news?.value.title, this.news?.value.body, this.news?.value.date, this.news?.value.likes)

  }
}