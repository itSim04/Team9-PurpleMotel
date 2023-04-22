import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { LanguagesResponse, LanguagesPackage, Language, LanguagePackage, LanguageResponse } from "src/app/models/Language";
import { LanguageListsResponse, LanguageListsPackage, LanguageList, LanguageListResponse, LanguageListPackage } from "src/app/models/LanguageList";
import { UrlBuilderService } from "src/app/services/utility/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class LanguageDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllLanguages(): Observable<LanguagesPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<LanguagesResponse>(this.url.generateUrl('languages'), { headers: headers }).pipe(

        map((response: LanguagesResponse): LanguagesPackage => {

          const languages = new Map<string, Language>();


          response.data.forEach(language => {

            languages.set(language.id, { ...language.attributes, language: language.relationships.language.data.id });

          });


          return {

            languages: languages

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }

  getTerms(language_id: string): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<any>(this.url.generateUrl(`terms?language=${language_id}`),  { headers: headers }).pipe(

        map((response: any): any => {

          return response.data;

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }


  getOneLanguage(id: string): Observable<LanguagePackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<LanguageResponse>(this.url.generateUrl(`languages/${id}`), { headers: headers }).pipe(
        map((response: LanguageResponse): LanguagePackage => {



          return {

            language: {

              key: id,
              value: { ...response.data.attributes, language: response.data.relationships.language.data.id }

            }
          };



        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  getAllLanguageLists(): Observable<LanguageListsPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<LanguageListsResponse>(this.url.generateUrl('language-list'), { headers: headers }).pipe(

        map((response: LanguageListsResponse): LanguageListsPackage => {

          const language_list = new Map<string, LanguageList>();

          response.data.forEach(language => {

            language_list.set(language.id, language.attributes);

          });

          return {

            language_lists: language_list

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  };
  getOneLanguageList(id: string): Observable<LanguageListPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<LanguageListResponse>(this.url.generateUrl(`language-list/${id}`), { headers: headers }).pipe(
        map((response: LanguageListResponse): LanguageListPackage => {

          return {

            language_list: {

              key: id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  };

  addNewLanguage(room: Language) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<LanguageResponse>(this.url.generateUrl('languages'), room, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyLanguage(language_id: string, language: Language) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`languages/${language_id}`), language, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteLanguage(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`languages/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewLanguageLists(language_list: LanguageList) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.post<LanguageListResponse>(this.url.generateUrl('language-list'), language_list, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyLanguageLists(language_id: string, language_list: LanguageList) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.put(this.url.generateUrl(`roomtypes/${language_id}`), language_list, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteLanguageLists(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.delete(this.url.generateUrl(`roomtypes/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

}
