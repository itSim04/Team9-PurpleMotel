import { Component } from '@angular/core';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  users_db = this.url.getImage('users-db')
  rooms_db = this.url.getImage('rooms-db')
  announcement_db = this.url.getImage('announcement-db')
  food_db = this.url.getImage('food-db')
  booking_db = this.url.getImage('bookings-db')
  language_db = this.url.getImage('language-db')
  news_db = this.url.getImage('news-db')
  order_db = this.url.getImage('order-db')
  registration_db = this.url.getImage('registration-db')
  service_db = this.url.getImage('services-db')
  promo_db = this.url.getImage('promo-db')
  stock_db = this.url.getImage('stock-db')
  informations_db = this.url.getImage('information-db')
  images_db = this.url.getImage('image-db')
  constructor (private url: UrlBuilderService) {}
}
