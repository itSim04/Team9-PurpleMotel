import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/News';
import { NewsDatabaseService } from '../../admin/news-database/news-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

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
