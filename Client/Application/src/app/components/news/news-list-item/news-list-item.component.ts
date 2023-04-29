import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { News } from 'src/app/models/News';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';
import { extractUserId } from '../../database/database.component';
import { NewsListPopupService } from '../news-list-popup/news-list-popup.service';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
})
export class NewsListItemComponent implements OnInit {

  ngOnInit() { }

  @Input() news!: KeyValue<string, News>;

  @Output() open_modal = new EventEmitter<KeyValue<string, News>>();

  constructor (private news_dialog: NewsListPopupService, private news_service: NewsDatabaseService) { }

  openPopup() {

    const dialogRef = this.news_dialog.openDialog(this.news?.key, this.news?.value.title, this.news?.value.body, this.news?.value.date, this.news?.value.likes_number, this.news.value.is_liked);

  }


  like() {
    const user_id = extractUserId();

    if (user_id) {

      console.log(this.news.value.is_liked);

      if (this.news.value.is_liked) {

        this.news_service.unlike(this.news.key, user_id).subscribe(data => {

          this.news.value.likes_number -= 1;
          this.news.value.is_liked = false;
        });

      } else {

        this.news_service.like(this.news.key, user_id).subscribe(data => {

          console.log(data);
          this.news.value.likes_number += 1;
          this.news.value.is_liked = true;

        });
      }
    }
  }

}