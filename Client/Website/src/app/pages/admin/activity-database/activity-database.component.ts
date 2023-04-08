import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Activity } from 'src/app/models/Activity';
import { ActivityDatabaseService } from './activity-database.service';
import { map } from 'rxjs';
import { Data } from '@angular/router';

@Component({
  selector: 'app-activity-database',
  templateUrl: './activity-database.component.html',
  styleUrls: ['./activity-database.component.scss']
})
export class ActivityDatabaseComponent {

  extra_injection: DataInjection<Activity> = {

    title: 'Activity',
    displayed_columns: [
      {
        key:'title'
      },
      {
        key:'description'
      },
      {
        key:'price'
      },
      {
        key:'capacity'
      },
      {
        key:'start_date'
      },
      {
        key:'end_date'
      },

    ],
    data_fetcher:()=>this.activity_service.getAllActivities().pipe(map(data => data.activities))
  }
  
  constructor(private activity_service: ActivityDatabaseService){}

  

}
