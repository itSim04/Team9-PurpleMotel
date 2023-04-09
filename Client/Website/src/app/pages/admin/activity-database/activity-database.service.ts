import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ActivitiesResponse, Activity, ActivityResponse, ActivityPackage, ActivitiesPackage } from "src/app/models/Activity";
import { FacilitiesPackage, FacilitiesResponse, Facility, FacilityPackage, FacilityResponse } from "src/app/models/Facility";
import { UrlBuilderService } from "src/app/services/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class ActivityDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllActivities(): Observable<ActivitiesPackage> {

    try {

      return this.http.get<ActivitiesResponse>(this.url.generateUrl('activities')).pipe(

        map((response: ActivitiesResponse): ActivitiesPackage => {

          const activities = new Map<string, Activity>();

          response.data.forEach(activity => {

            activities.set(activity.id, activity.attributes);

          });

          return {

            activities: activities

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneActivity(id: string): Observable<ActivityPackage> {

    try {

      return this.http.get<ActivityResponse>(this.url.generateUrl(`activities/${id}`)).pipe(
        map((response: ActivityResponse): ActivityPackage => {

          return {

            activity: {

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

  addNewActivity(activity: Activity) {

    try {

      return this.http.post<ActivityResponse>(this.url.generateUrl('activities'), activity).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyActivity(activity_id: string, activity: Activity) {

    try {

      return this.http.put(this.url.generateUrl(`activities/${activity_id}`), activity).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteActivity(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`activities/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  getAllFacilities(): Observable<FacilitiesPackage> {

    try {

      return this.http.get<FacilitiesResponse>(this.url.generateUrl('facilities')).pipe(

        map((response: FacilitiesResponse): FacilitiesPackage => {

          const facilities = new Map<string, Facility>();

          response.data.forEach(facility => {

            facilities.set(facility.id, facility.attributes);

          });

          return {

            facilities: facilities

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneFacility(id: string): Observable<FacilityPackage> {

    try {

      return this.http.get<FacilityResponse>(this.url.generateUrl(`facilities/${id}`)).pipe(
        map((response: FacilityResponse): FacilityPackage => {

          return {

            facility: {

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

  addNewFacility(facility: Facility) {

    try {

      return this.http.post<FacilityResponse>(this.url.generateUrl('facilities'), facility).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyFacility(facility_id: string, facility: Facility) {

    try {

      return this.http.put(this.url.generateUrl(`facilities/${facility_id}`), facility).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteFacility(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`facilities/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}