import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { User, UserAttributes } from 'src/app/models/User';
import { UserType } from 'src/app/models/UserType';
import { UrlBuilderService } from 'src/app/services/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDatabaseService {


}
