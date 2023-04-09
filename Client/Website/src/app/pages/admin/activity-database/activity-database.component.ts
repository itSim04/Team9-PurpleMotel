import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Activity } from 'src/app/models/Activity';
import { ActivityDatabaseService } from './activity-database.service';
import { map } from 'rxjs';
import { Data } from '@angular/router';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-activity-database',
  templateUrl: './activity-database.component.html',
  styleUrls: ['./activity-database.component.scss']
})
export class ActivityDatabaseComponent {


  data_injection: DataInjection<Facility> = {

    title: 'Facility',
    displayed_columns: [
      {
        key:'title'
      },
      {
        key:'description'
      }
    ],
    data_fetcher:()=>this.activity_service.getAllFacilities().pipe(map(data => data.facilities))
  }

  change_injection: ChangeInjection<Facility> = {
    default_state: {
      title: '',
      description: '',
    },

    data_type: 'facility',

    fields: [
      {
        key: 'title',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      }
    ],

    add_service: facility => this.activity_service.addNewFacility(facility),
    modify_service: (key, data) => this.activity_service.modifyFacility(key, data),
    delete_service: key => this.activity_service.deleteFacility(key),
    identifier: (data) => '' + data.title,
    side_panel: 'empty'
  }

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

  extra_change_injection: ChangeInjection<Activity> = {
    default_state: {
      title: '',
      description: '',
      price: 0,
      capacity: 0,
      start_date: new Date(),
      end_date: new Date()
    },

    data_type: 'activity',

    fields: [
      {
        key: 'title',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      },
      {
        key: 'capacity',
        type: 'number'
      },
      {
        key: 'price',
        type: 'number'
      },
      {
        key: 'start_date',
        type: 'date'
      },
      {
        key: 'end_date',
        type: 'date'
      }
    ],

    add_service: activity => this.activity_service.addNewActivity(activity),
    modify_service: (key, data) => this.activity_service.modifyActivity(key, data),
    delete_service: key => this.activity_service.deleteActivity(key),
    identifier: (data) => '' + data.title,
    side_panel: 'empty'
  }

}
