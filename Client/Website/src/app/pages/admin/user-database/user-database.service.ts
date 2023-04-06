import { UrlBuilderService } from './../../../services/url-builder.service';
import { HttpClient } from '@angular/common/http';
import { User, UserCredentials, UserResponse, UserPackage, UsersResponse, UsersPackage } from './../../../models/User';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoomsPackage, RoomsResponse, Room, RoomPackage, RoomResponse } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllUsers(): Observable<UsersPackage> {

    try {

      return this.http.get<UsersResponse>(this.url.generateUrl('users')).pipe(

        map((response: UsersResponse): UsersPackage => {

          const users = new Map<string, User>();

          response.data.forEach(user => {

            users.set(user.id, user.attributes);

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

    try {

      return this.http.get<UserResponse>(this.url.generateUrl(`users/${id}`)).pipe(
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

  addNewUser(user: User) {

    try {

      return this.http.post<UserResponse>(this.url.generateUrl('users'), {...user, password: 'password', date_of_birth: new Date(), language: '0'}).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyUser(user_id: string, user: User) {

    try {

      return this.http.put(this.url.generateUrl(`users/${user_id}`), user).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteUser(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`users/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }


}
