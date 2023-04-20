import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { NewsesPackage, NewsesResponse, News, NewsPackage, NewsResponse } from "src/app/models/News";
import { UrlBuilderService } from "../utility/url-builder.service";

@Injectable({
  providedIn: 'root'
})
export class NewsDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllNewses(): Observable<NewsesPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<NewsesResponse>(this.url.generateUrl('news'), {headers: headers}).pipe(

        map((response: NewsesResponse): NewsesPackage => {

          const newses = new Map<string, News>();

          response.data.forEach(news => {

            newses.set(news.id, news.attributes);

          });

          return {

            newses: newses

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  getOneNews(id: string): Observable<NewsPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<NewsResponse>(this.url.generateUrl(`news/${id}`), {headers: headers}).pipe(
        map((response: NewsResponse): NewsPackage => {

          return {

            news: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewNews(news: News) {

    const headers = this.url.generateHeader()

    try {

      return this.http.post<NewsResponse>(this.url.generateUrl('news'), news, {headers: headers}).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyNews(news_id: string, news: News) {

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`news/${news_id}`), news, {headers: headers}).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteNews(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`news/${key}`), {headers: headers}).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}