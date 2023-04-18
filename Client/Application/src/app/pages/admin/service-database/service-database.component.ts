
import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Activity } from 'src/app/models/Activity';
import { ServiceDatabaseService } from './service-database.service';
import { map } from 'rxjs';
import { Data } from '@angular/router';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-service-database',
  templateUrl: './service-database.component.html',
  styleUrls: ['./service-database.component.scss']
})
export class ServiceDatabaseComponent {


  data_injection: DataInjection<Facility> = {

    permission: 'facility',
    title: 'Facility',
    displayed_columns: [
      {
        key: 'title'
      },
      {
        key: 'description'
      }
    ],
    data_fetcher: () => this.activity_service.getAllFacilities().pipe(map(data => [data.facilities, undefined]))
  };

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
  };

  extra_injection: DataInjection<Activity> = {

    permission: 'activity',
    title: 'Activity',
    displayed_columns: [
      {
        key: 'title'
      },
      {
        key: 'price',
        type: 'price'
      },
      {
        key: 'capacity'
      },
      {
        key: 'start_date',
        type: 'custom',
        custom: (data) => {

          const date = data.start_date.toString();
          return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

        }
      },
      {
        key: 'end_date',
        type: 'custom',
        custom: (data) => {

          const date = data.start_date.toString();
          return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

        }
      },

    ],
    data_fetcher: () => this.activity_service.getAllActivities().pipe(map(data => [data.activities, undefined]))
  };

  constructor (private activity_service: ServiceDatabaseService) { }

  extra_change_injection: ChangeInjection<Activity> = {
    default_state: {
      title: '',
      description: '',
      price: 0,
      capacity: 0,
      start_date: '1970-01-01',
      end_date: '1970-01-01'
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
  };

}
