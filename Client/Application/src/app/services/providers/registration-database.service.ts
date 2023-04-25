import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { RegistrationsPackage, RegistrationsResponse, Registration, RegistrationPackage, RegistrationResponse } from 'src/app/models/Registration';
import { User, UserAttributes } from 'src/app/models/User';
import { UserType } from 'src/app/models/UserType';
import { UrlBuilderService } from '../utility/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllRegistrations(): Observable<RegistrationsPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<RegistrationsResponse>(this.url.generateUrl('registrations'), { headers: headers }).pipe(


        map((response: RegistrationsResponse): RegistrationsPackage => {

          const registrations = new Map<string, Registration>();
          const activities = new Map<string, Activity>();
          const users = new Map<string, User>();
          const user_types = new Map<string, UserType>();

          response.data.forEach(registration => {

            registrations.set(registration.id, { ...registration.attributes, activity_id: registration.relationships.activity.data.id, user_id: registration.relationships.user.data.id });

          });

          if (response.included) {

            response.included.forEach(value => {

              switch (value.type) {

                case 'Activities':

                  activities.set(value.id, value.attributes as Activity );

                  break;


                case 'Users':

                  users.set(value.id, { ...value.attributes as UserAttributes, type: value.relationships.user_type.data.id, permissions: new Map() });

                  break;

                case 'UserTypes':

                  user_types.set(value.id, value.attributes as UserType);

                  break;


              }



            });

          }



          return {

            registrations: registrations,
            activities: activities,
            user_types: user_types,
            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  
  getOneRegistration(id: string): Observable<RegistrationPackage> {

    const headers = this.url.generateHeader()

    try {

      return this.http.get<RegistrationResponse>(this.url.generateUrl(`registrations/${id}`), { headers: headers }).pipe(
        map((response: RegistrationResponse): RegistrationPackage => {

          return {

            registration: {

              key: response.data.id,
              value: { ...response.data.attributes, activity_id: response.data.relationships.activity.data.id, user_id: response.data.relationships.user.data.id }

            },

          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewRegistration(registration: Registration) {

    const headers = this.url.generateHeader()

    try {
      console.log(registration);
      return this.http.post<RegistrationResponse>(this.url.generateUrl('registrations'), { ...registration, activity_id: registration.activity_id, user_id: registration.activity_id }, { headers: headers }).pipe(

        map(result => {

          return result.data.id;
        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyRegistration(registration_id: string, registration: Registration) {

    const headers = this.url.generateHeader()

    try {

      return this.http.put(this.url.generateUrl(`registrations/${registration_id}`), registration, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteRegistration(key: string) {

    const headers = this.url.generateHeader()

    try {

      return this.http.delete(this.url.generateUrl(`registrations/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}
