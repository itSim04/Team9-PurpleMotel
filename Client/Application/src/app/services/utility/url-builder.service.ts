import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extractUserToken } from 'src/app/components/database/database.component';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  master_url = "http://127.0.0.1:8000";
  version = "v1";

  getImage(image: 'room-main' | 'service-main' | 'restaurant-main' | 'menu-main' | 'home-main' | 'logo' | 'support-background' | 'chefs-background' | 'profile-main' | 'chat-main' | 'users-db' |'rooms-db' |'bookings-db' |'food-db' |'announcement-db' |'language-db' |'news-db' |'order-db' |'promo-db' |'registration-db' | 'services-db' |'stock-db' | 'information-db'| 'register-bg' | 'login-pic-1' | 'login-pic-2') {

    return `${this.master_url}/storage/images/assets/application/${image}`;

  }
  generateUrl(path: string) {

    return `${this.master_url}/api/${this.version}/${path}`;

  }

  generateHeader() {

    const token = extractUserToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
