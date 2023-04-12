import { UserType, UserTypePackage, UserTypeResponse } from './../../../models/UserType';
import { UrlBuilderService } from './../../../services/url-builder.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAttributes, UserCredentials, UserResponse, UserPackage, UsersResponse, UsersPackage, User } from './../../../models/User';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoomsPackage, RoomsResponse, Room, RoomPackage, RoomResponse } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { UserTypesPackage, UserTypesResponse } from 'src/app/models/UserType';
import { clone } from 'src/app/components/database/change/change.component';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }



  getAllUsers(): Observable<UsersPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {


      return this.http.get<UsersResponse>(this.url.generateUrl('users'), { headers: headers }).pipe(

        map((response: UsersResponse): UsersPackage => {

          const users = new Map<string, User>();

          response.data.forEach(user => {

            const new_user = {
              ...user.attributes,
              type: user.relationships.user_type.data.id,
              permissions: new Map<string, number>()
            };
            users.set(user.id, new_user);

          });


          response.included?.forEach(permission => {

            const user = users.get(permission.attributes.concerned_party);

            if (user) {

              user.permissions.set(permission.attributes.label, Number.parseInt(`${permission.attributes.delete}${permission.attributes.write}${permission.attributes.read}`, 2));
            }

          });

          return {

            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneUser(id: string): Observable<UserPackage> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<UserResponse>(this.url.generateUrl(`users/${id}`), { headers: headers }).pipe(
        map((response: UserResponse): UserPackage => {

          return {

            user: {

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

  addNewUser(user: UserAttributes) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.post<UserResponse>(this.url.generateUrl('users'), { ...user, password: 'password', date_of_birth: '1970-01-01', language: '0' }, { headers: headers }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyUser(user_id: string, user: User) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const permissions: any = {};
    user.permissions.forEach((permission, label) => {

      permissions[label] = permission;

    });

    const user_request = clone(user);
    user_request.permissions = permissions;

    try {

      return this.http.put(this.url.generateUrl(`users/${user_id}`), user_request, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteUser(key: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.delete(this.url.generateUrl(`users/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }




  getAllUserTypes(): Observable<UserTypesPackage> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      return this.http.get<UserTypesResponse>(this.url.generateUrl('user-types'), { headers: headers }).pipe(

        map((response: UserTypesResponse): UserTypesPackage => {
          const users = new Map<string, UserType>();

          response.data.forEach(user => {

            users.set(user.id, { ...user.attributes, permissions: new Map<string, number>() });

          });

          response.included?.forEach(permission => {

            const user = users.get(permission.attributes.concerned_party);

            if (user) {


              user.permissions.set(permission.attributes.label, Number.parseInt(`${permission.attributes.delete}${permission.attributes.write}${permission.attributes.read}`, 2)


              );
            }

          });

          return {

            users: users

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneUserType(id: string): void {

    // try {

    //   return this.http.get<UserTypeResponse>(this.url.generateUrl(`user-types/${id}`)).pipe(
    //     map((response: UserTypeResponse): UserTypePackage => {

    //       return {

    //         user: {

    //           key: response.data.id,
    //           value: response.data.attributes

    //         },
    //       };


    //     })
    //   );

    // } catch (e: unknown) {

    //   throw new Error(JSON.stringify(e));

    // }

  };

  addNewUserType(user: UserType) {

    const permissions: any = {};
    user.permissions.forEach((permission, label) => {

      permissions[label] = permission;

    });

    console.log(permissions);
    try {

      return this.http.post<UserTypeResponse>(this.url.generateUrl('user-types'), { label: user.label, description: user.description, permissions: permissions }).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyUserType(user_id: string, user: UserType) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const permissions: any = {};
    user.permissions.forEach((permission, label) => {

      permissions[label] = permission;

    });

    try {

      return this.http.put(this.url.generateUrl(`user-types/${user_id}`), { label: user.label, description: user.description, permissions: permissions }, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteUserType(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`user-types/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }




}
