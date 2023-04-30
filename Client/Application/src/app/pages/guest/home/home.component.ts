import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/News';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';
import { ProfileModalData } from '../profile/profile-modal/profile-modal.component';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  news: Map<string, News> = new Map();
  filtered_news: [string, News][] = [];
  subscription?: Subscription;

  active_data?: ProfileModalData;

  isModalOpen: boolean = false;



  constructor (private news_service: NewsDatabaseService, private url: UrlBuilderService) { }

  home_bg = this.url.getImage('home-main');
  
  get data() {

    return Array.from(this.filtered_news);

  }

  ngOnInit() {
    this.subscription = this.news_service.getAllNews().subscribe(data => {
      this.news = data.news;
      console.log(this.news);
      this.filtered_news = Array.from(this.news);
    });

    // for(let key of this.news) 
    //   console.log(key);

  }

  async openModal(data: ProfileModalData) {

    this.active_data = undefined;

    this.isModalOpen = true;

    this.active_data = data;

  }

  async closeModal() {



    this.active_data = undefined;

    this.isModalOpen = false;

  }


}
