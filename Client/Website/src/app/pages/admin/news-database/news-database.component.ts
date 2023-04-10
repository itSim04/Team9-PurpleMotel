import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { News } from 'src/app/models/News';
import { NewsDatabaseService } from './news-database.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-news-database',
  templateUrl: './news-database.component.html',
  styleUrls: ['./news-database.component.scss']
})
export class NewsDatabaseComponent {

  constructor(private news_service: NewsDatabaseService){}

  data_injection: DataInjection<News> = {
    
    title: 'News',
    
    permission: 'news',
    
    displayed_columns: [
      {
        key: 'title'
      },
      {
        key: 'body'
      },
      {
        key: 'date'
      },
      {
        key: 'likes'
      }
    ],

    data_fetcher: () => this.news_service.getAllNewses().pipe(map(data => [data.newses, undefined])),
  }
}
