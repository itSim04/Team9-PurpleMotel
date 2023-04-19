import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/services/dialogs/authentication/login/login.component';
import { RegisterComponent } from 'src/app/services/dialogs/authentication/register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { User, UserInformation, UserResponse } from 'src/app/models/User';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserDatabaseService } from '../../admin/user-database/user-database.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileDialogService {

  constructor(public dialog: MatDialog, private request: HttpClient, private userDatabaseService: UserDatabaseService) { }

  openDialog(type: 'edit_profile' | 'change_password') {

    let component: ComponentType<unknown>;

    switch (type) {

      case 'edit_profile':

        component = EditProfileComponent;
        break;

      case 'change_password':

        component = ChangePasswordComponent;
        break;

    }

    return this.dialog.open(component, {});
  }

  resetPassword(email: string): Observable<void> {

    return this.request.post<void>("http://127.0.0.1:8000/api/v1/auth/reset-password", { email }).pipe(
  
      map(result => {
        
        // handle successful reset password response (if any)
  
      }), catchError(error => {
  
        // handle error response
  
        return throwError(error);
  
      })
      
    );
  }



  // resetPassword(email: string, token: string, newPassword: string): Observable<void> {
  //   const resetRequest = {
  //     email: email,
  //     token: token,
  //     password: newPassword
  //   };
  
  //   return this.http.post<void>('http://example.com/api/reset-password', resetRequest);
  // }
  
  

}
