import { KeyValue } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { extractUserId } from "src/app/components/database/database.component";
import { NewsPackage, NewsResponse, News, SingleNewsPackage, SingleNewsResponse, NewsAttributes } from "src/app/models/News";
import { UrlBuilderService } from "src/app/services/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class NewsDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllNews(): Observable<NewsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<NewsResponse>(this.url.generateUrl('news'), { headers: headers }).pipe(

        map((response: NewsResponse): NewsPackage => {

          console.log(response);

          const news = new Map<string, News>();

          response.data.forEach(data => {

    
            news.set(data.id, { ...data.attributes, is_liked: false, likes: [] });

          });

          console.log(news);
          response.included.forEach(like => {

            const temp = news.get(like.attributes.news_id);
            console.log(like.attributes.news_id, temp);

            if (temp) {

              console.log(like.attributes.user_id, extractUserId())
              if (extractUserId() == like.attributes.user_id) temp.is_liked = true;

              temp.likes.push(like.attributes);

            }

          });

    

          return {

            news: news

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  getOneNews(id: string): Observable<SingleNewsPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<SingleNewsResponse>(this.url.generateUrl(`news/${id}`), { headers: headers }).pipe(
        map((response: SingleNewsResponse): SingleNewsPackage => {

          const news: KeyValue<string, News> = {

            key: response.data.id,
            value: { ...response.data.attributes, likes: [], is_liked: false }

          };

          response.included.forEach(like => {

            if (extractUserId() == like.attributes.user_id) news.value.is_liked = true;

            news.value.likes.push(like.attributes);


          });
          return {

            news: news


          };
        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewNews(news: NewsAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<SingleNewsResponse>(this.url.generateUrl('news'), news, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  like(news_id: string, user_id: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<any>(this.url.generateUrl(`like?news_id=${news_id}&user_id=${user_id}`), { headers: headers });
    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  unlike(news_id: string, user_id: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<any>(this.url.generateUrl(`unlike?news_id=${news_id}&user_id=${user_id}`), { headers: headers });
    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyNews(news_id: string, news: NewsAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`news/${news_id}`), news, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteNews(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`news/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}