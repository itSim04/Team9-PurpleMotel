
import { Router } from '@angular/router';
import { News } from 'src/app/models/News';
import { Component } from '@angular/core';
import { NewsAttributes } from 'src/app/models/News';
import { Subscription } from 'rxjs';
import { NewsDatabaseService } from 'src/app/services/providers/news-database.service';
import { RawRoomsPackage, RoomsPackage } from 'src/app/models/Room';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  news: Map<string, News> = new Map();
  filtered_news: [string, News][] = [];
  subscription?: Subscription;

  constructor (private news_service: NewsDatabaseService, private route: Router, public url: UrlBuilderService) { }

  get data() {

    return Array.from(this.filtered_news);

  }

  filterRooms(result: RoomsPackage) {

    const temp = [

      Array.from(result.rooms.entries()),
      Array.from(result.room_types.entries()),
      Array.from(result.promo_codes.entries())


    ];

    localStorage.setItem('temp_quick_availability', JSON.stringify(temp));
    this.route.navigate(['/rooms']);

  }

  ngOnInit() {
    this.subscription = this.news_service.getAllNews().subscribe(data => {
      this.news = data.news;
      this.filtered_news = Array.from(this.news);
    });
  }
}
