import { Component } from '@angular/core';
import { News } from 'src/app/models/News';
import { Subscription } from 'rxjs';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  news: Map<string, News> = new Map()
  filtered_news: [string, News][] = []
  subscription?: Subscription;

  constructor(private news_service: NewsDatabaseService) { }

  get data() {

    return Array.from(this.filtered_news);

  }

  ngOnInit(){
    this.subscription = this.news_service.getAllNewses().subscribe(data => {
      this.news = data.newses
      this.filtered_news = Array.from(this.news)
    })
  }
}
