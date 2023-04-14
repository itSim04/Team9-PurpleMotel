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

  change_injection: ChangeInjection<News> = {
    default_state:{
      title: '',
      body: '',
      date: '',
      likes: 0
    },

    side_panel: 'empty',

    data_type: 'news',

    fields:[
      {
        key: 'title',
        type: 'text'
      },
      {
        key: 'body',
        type: 'text'
      },
      {
        key: 'date',
        type: 'date'
      },
      {
        key: 'likes',
        type: 'number'
      }
    ],

    add_service: news => this.news_service.addNewNews(news),
    modify_service: (key, data) => this.news_service.modifyNews(key, data),
    delete_service: key => this.news_service.deleteNews(key),
    identifier: (data) => data.title,
  }
}
