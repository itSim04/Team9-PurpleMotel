import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  master_url = "http://127.0.0.1:8000/api";
  version = "v1";
  
  generateUrl(path: string) {

    return `${this.master_url}/${this.version}/${path}`

  }
}
