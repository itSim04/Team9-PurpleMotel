import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AnnouncementsPackage, AnnouncementsResponse, Announcement, AnnouncementPackage, AnnouncementResponse } from "src/app/models/Announcement";
import { User } from "src/app/models/User";
import { UrlBuilderService } from "src/app/services/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class AnnouncementDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllAnnouncements(): Observable<AnnouncementsPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {

      return this.http.get<AnnouncementsResponse>(this.url.generateUrl('announcements'), { headers: headers }).pipe(

        map((response: AnnouncementsResponse): AnnouncementsPackage => {

          const announcements = new Map<string, Announcement>();
          const users = new Map<string, User>();

          response.data.forEach(announcement => {

            announcements.set(announcement.id, { ...announcement.attributes, author_id: announcement.relationships.user.data.id });

          });

          if (response.included) {

            response.included.forEach(user => {

              users.set(user.id, { ...user.attributes, permissions: new Map(), type: user.relationships.user_type.data.id });

            });

          }

          return {

            announcements: announcements,
            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneAnnouncement(id: string): Observable<AnnouncementPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {

      return this.http.get<AnnouncementResponse>(this.url.generateUrl(`announcements/${id}`), { headers: headers }).pipe(
        map((response: AnnouncementResponse): AnnouncementPackage => {

          if (response.included) {
            return {

              announcement: {

                key: response.data.id,
                value: { ...response.data.attributes, author_id: response.data.relationships.user.data.id }

              },

              user: {

                key: response.data.relationships.user.data.id,
                value: { ...response.included[0].attributes, permissions: new Map(), type: response.included[0].relationships.user_type.data.id }

              }
            };
          }
          throw new Error("Foreign Key Constraint failure");


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewAnnouncement(announcement: Announcement) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {

      return this.http.post<AnnouncementResponse>(this.url.generateUrl('announcements'), announcement, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyAnnouncement(announcement_id: string, announcement: Announcement) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {

      return this.http.put(this.url.generateUrl(`announcements/${announcement_id}`), announcement, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteAnnouncement(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {

      return this.http.delete(this.url.generateUrl(`announcements/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}