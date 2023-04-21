import { News } from 'src/app/models/News';
import { Component } from '@angular/core';
import { NewsAttributes } from 'src/app/models/News';
import { Subscription } from 'rxjs';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  news: Map<string, News> = new Map();
  filtered_news: [string, News][] = [];
  subscription?: Subscription;

  constructor (private news_service: NewsDatabaseService) { }

  get data() {

    return Array.from(this.filtered_news);

  }

  ngOnInit() {
    this.subscription = this.news_service.getAllNews().subscribe(data => {
      this.news = data.news;
      console.log(this.news);
      this.filtered_news = Array.from(this.news);
    });
  }
}
