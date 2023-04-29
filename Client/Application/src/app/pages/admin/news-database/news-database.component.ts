import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { News, NewsAttributes } from 'src/app/models/News';
import { map } from 'rxjs';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';

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
        key: 'likes_number'
      }
    ],

    data_fetcher: () => this.news_service.getAllNews().pipe(map(data => [data.news, undefined])),
  }

  change_injection: ChangeInjection<News> = {
    default_state:{
      image: '',
      title: '',
      is_liked: false,
      likes: [],
      body: '',
      date: '',
      likes_number: 0
    },

    side_panel: 'image',

    data_type: 'News',

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
        key: 'likes_number',
        type: 'number'
      }
    ],

    add_service: news => this.news_service.addNewNews(news),
    modify_service: (key, data) => this.news_service.modifyNews(key, data),
    delete_service: key => this.news_service.deleteNews(key),
    identifier: (data) => data.title,
  }
}
