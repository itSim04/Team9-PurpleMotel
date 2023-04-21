import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extractUserToken } from '../components/database/database.component';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  master_url = "http://127.0.0.1:8000/api";
  version = "v1";
  
  generateUrl(path: string) {

    return `${this.master_url}/${this.version}/${path}`

  }
  generateHeader() {

    const token = extractUserToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
