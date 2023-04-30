
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ImagesResponse } from 'src/app/models/Image';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ImageCachingService implements HttpInterceptor {

  private cache: { [url: string]: Blob; } = {};

  constructor(private url: UrlBuilderService, private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('http://localhost:8000/storage/images/')) {

      console.log('Caching Image');
      const cachedImage = this.cache[request.url];

      if (cachedImage) {
        // If the image is already cached, return it as a response
        return of(new HttpResponse({ body: cachedImage }));
      } else {
        // If the image is not cached, make the request and cache the response
        return next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this.cache[request.url] = event.body;
            }
          })
        );
      }
    } else {
      // If the request is not for an image, pass it through to the next handler
      return next.handle(request);
    }
  }
 
}

export const image_names = [
  'register-background',
  'room-main',
  'service-main',
  'restaurant-main',
  'menu-main',
  'home-main',
  'logo',
  'support-background',
  'chefs-background',
  'profile-main',
  'chat-main',
  'users-db',
  'rooms-db',
  'bookings-db',
  'food-db',
  'announcement-db',
  'language-db',
  'news-db',
  'order-db',
  'promo-db',
  'registration-db',
  'services-db',
  'stock-db'


];
