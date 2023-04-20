import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AnnouncementsPackage, AnnouncementsResponse, Announcement, AnnouncementPackage, AnnouncementResponse } from "src/app/models/Announcement";
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

          response.data.forEach(announcement => {

            announcements.set(announcement.id, announcement.attributes);

          });

          return {

            announcements: announcements

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