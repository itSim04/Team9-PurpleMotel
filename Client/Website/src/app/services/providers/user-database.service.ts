import { UserChange } from './../../models/User';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { RoomsPackage, RoomsResponse, Room, RoomPackage, RoomResponse } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { UserType, UserTypeResponse, UserTypesPackage, UserTypesResponse } from 'src/app/models/UserType';
import { clone } from 'src/app/components/database/change/change.component';
import { HttpClient } from '@angular/common/http';
import { UsersPackage, UsersResponse, User, UserPackage, UserResponse, UserAttributes } from 'src/app/models/User';
import { UrlBuilderService } from '../utility/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }



  getAllUsers(): Observable<UsersPackage> {

    const headers = this.url.generateHeader();

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
    const headers = this.url.generateHeader();

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

    const headers = this.url.generateHeader();

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

    const headers = this.url.generateHeader();

    const user_request = clone(user);
    const permissions: any = {};
    if (user.permissions) {

      user.permissions.forEach((permission, label) => {

        permissions[label] = permission;

      });
      user_request.permissions = permissions;
    }



    try {

      return this.http.put(this.url.generateUrl(`users/${user_id}`), user_request, { headers: headers }).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
  editProfile(user_id: string, user: UserChange) {

    const headers = this.url.generateHeader();

    try {

      return this.http.put<UserResponse>(this.url.generateUrl(`users/${user_id}`), user, { headers: headers }).pipe(map((data) => {

        return data.data.attributes;
      }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteUser(key: string) {

    const headers = this.url.generateHeader();

    try {

      return this.http.delete(this.url.generateUrl(`users/${key}`), { headers: headers }).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }




  getAllUserTypes(): Observable<UserTypesPackage> {

    const headers = this.url.generateHeader();

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

    const headers = this.url.generateHeader();

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
