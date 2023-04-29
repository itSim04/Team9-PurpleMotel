import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AnnouncementsPackage, AnnouncementsResponse, Announcement, AnnouncementPackage, AnnouncementResponse } from "src/app/models/Announcement";
import { User } from "src/app/models/User";
import { UrlBuilderService } from "../utility/url-builder.service";



@Injectable({
  providedIn: 'root'
})
export class AnnouncementDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllAnnouncements(): Observable<AnnouncementsPackage> {

    try {

      return this.http.get<AnnouncementsResponse>(this.url.generateUrl('announcements')).pipe(

        map((response: AnnouncementsResponse): AnnouncementsPackage => {

          const announcements = new Map<string, Announcement>();
          const users = new Map<string, User>();

          response.data.forEach(announcement => {

            announcements.set(announcement.id, announcement.attributes);

          });

          if (response.included) {

            response.included.forEach(t => {

              users.set(t.id, { ...t.attributes, type: t.relationships.user_type.data.id, permissions: new Map() });

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

    try {

      return this.http.get<AnnouncementResponse>(this.url.generateUrl(`announcements/${id}`)).pipe(
        map((response: AnnouncementResponse): AnnouncementPackage => {

          return {

            announcement: {

              key: response.data.id,
              value: response.data.attributes

            },
            user: {

              key: response.data.attributes.author_id,
              value: response.included.attributes as User

            }
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewAnnouncement(announcement: Announcement) {

    try {

      return this.http.post<AnnouncementResponse>(this.url.generateUrl('announcements'), announcement).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyAnnouncement(announcement_id: string, announcement: Announcement) {

    try {

      return this.http.put(this.url.generateUrl(`announcements/${announcement_id}`), announcement).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteAnnouncement(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`announcements/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}