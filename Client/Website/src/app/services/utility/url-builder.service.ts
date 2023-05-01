import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extractUserToken } from 'src/app/components/database/database.component';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  master_url = "http://127.0.0.1:8000";
  version = "v1";

  getImage(image: 'room-main' | 'service-main' | 'restaurant-main' | 'menu-main' | 'home-main' | 'logo' | 'support-background' | 'chefs-background', location='website') {

    return `${this.master_url}/storage/images/assets/${location}/${image}`;

  }
  generateUrl(path: string) {

    return `${this.master_url}/api/${this.version}/${path}`;

  }

  generateHeader() {

    const token = extractUserToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
