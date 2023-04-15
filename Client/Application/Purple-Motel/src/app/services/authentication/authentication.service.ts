import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserInformation, UserResponse, UserCredentials } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private request: HttpClient) { }

  register(user: UserInformation) {


    return this.request.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/register", user).pipe(

      map(result => {

        if (result.authorisation) {

          localStorage.setItem('token', result.authorisation.token);
          localStorage.setItem('user', JSON.stringify(result.data.attributes));

        }
        return;

      })


    );
  }

  
  login(user: UserCredentials) {


    return this.request.post<UserResponse>("http://127.0.0.1:8000/api/v1/auth/login", user).pipe(

      map(result => {

        if (result.authorisation) {

          localStorage.setItem('token', result.authorisation.token);
          localStorage.setItem('user', JSON.stringify(result.data.attributes));
          if (result.permissions) localStorage.setItem('permissions', JSON.stringify(result.permissions));
        }

        return;

      })


    );
  }
}
