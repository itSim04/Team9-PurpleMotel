import { KeyValue } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ActivitiesResponse, Activity, ActivityResponse, ActivityPackage, ActivitiesPackage } from "src/app/models/Activity";
import { FacilitiesPackage, FacilitiesResponse, Facility, FacilityAttributes, FacilityPackage, FacilityResponse } from "src/app/models/Facility";
import { Registration } from "src/app/models/Registration";
import { UrlBuilderService } from "../utility/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class ServiceDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllActivities(): Observable<ActivitiesPackage> {


    const headers = this.url.generateHeader();

    try {

      return this.http.get<ActivitiesResponse>(this.url.generateUrl('activities'), { headers: headers }).pipe(

        map((response: ActivitiesResponse): ActivitiesPackage => {


          const activities = new Map<string, Activity>();
          const registrations = new Map<string, Registration>();

          response.data.forEach(activity => {

            activities.set(activity.id, { ...activity.attributes, registrations: [], image: response.images.activities[activity.id] });

          });

          if (response.included) {

            response.included.forEach(registration => {

              const registration_keyvalue: KeyValue<string, Registration> = {
                key: registration.id, value: { ...registration.attributes, user_id: registration.relationships.user.data.id, activity_id: registration.relationships.activity.data.id }
              };
              registrations.set(registration_keyvalue.key, registration_keyvalue.value);
              activities.get(registration.relationships.activity.data.id)?.registrations.push(registration_keyvalue.value);

            });

          }


          return {

            activities: activities,
            registrations: registrations

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneActivity(id: string): Observable<ActivityPackage> {


    const headers = this.url.generateHeader();

    try {

      return this.http.get<ActivityResponse>(this.url.generateUrl(`activities/${id}`), { headers: headers }).pipe(
        map((response: ActivityResponse): ActivityPackage => {

          const activity: Activity = { ...response.data.attributes, registrations: [], image: response.images.activities[response.data.id] };
          if (response.included) {


            response.included.forEach(registration => {

              activity.registrations.push({ ...registration.attributes, activity_id: registration.relationships.activity.data.id, user_id: registration.relationships.user.data.id });

            });

          }
          return {

            activity: {

              key: response.data.id,
              value: activity

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewActivity(activity: Activity) {


    const headers = this.url.generateHeader();

    try {

      return this.http.post<ActivityResponse>(this.url.generateUrl('activities'), activity, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyActivity(activity_id: string, activity: Activity) {


    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`activities/${activity_id}`), activity, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteActivity(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`activities/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  getAllFacilities(): Observable<FacilitiesPackage> {

    const headers = this.url.generateHeader();

    try {

      return this.http.get<FacilitiesResponse>(this.url.generateUrl('facilities'), { headers: headers }).pipe(

        map((response: FacilitiesResponse): FacilitiesPackage => {

          const facilities = new Map<string, Facility>();

          response.data.forEach(facility => {

            facilities.set(facility.id, { ...facility.attributes, image: response.images.facilities[facility.id] });

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

    const headers = this.url.generateHeader();

    try {

      return this.http.get<FacilityResponse>(this.url.generateUrl(`facilities/${id}`), { headers: headers }).pipe(
        map((response: FacilityResponse): FacilityPackage => {

          return {

            facility: {

              key: response.data.id,
              value: { ...response.data.attributes, image: response.images.facilities[response.data.id] }

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewFacility(facility: FacilityAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.post<FacilityResponse>(this.url.generateUrl('facilities'), facility, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyFacility(facility_id: string, facility: FacilityAttributes) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put(this.url.generateUrl(`facilities/${facility_id}`), facility, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteFacility(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`facilities/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}