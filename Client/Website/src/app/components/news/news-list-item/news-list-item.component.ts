import { extractUserId } from 'src/app/components/database/database.component';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { News, NewsAttributes } from 'src/app/models/News';
import { NewsListPopupService } from 'src/app/services/utility/news-list-popup.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})

export class NewsListItemComponent {
  @Input() news!: KeyValue<string, News>;

  image = Math.random() > 0.5 ? "../../../../assets/news-sample1.png" : "../../../../assets/news-sample2.png";

  constructor (private news_dialog: NewsListPopupService, private news_service: NewsDatabaseService) { }

  openPopup() {

    const dialogRef = this.news_dialog.openDialog(this.news?.key, this.news?.value.title, this.news?.value.body, this.news?.value.date, this.news?.value.likes_number);

  }

  like() {


    const user_id = extractUserId();

    if (user_id) {

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