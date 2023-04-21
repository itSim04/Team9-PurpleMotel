import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { DataInjection, ChangeInjection } from 'src/app/models/Database';
import { Registration } from 'src/app/models/Registration';
import { User } from 'src/app/models/User';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { RegistrationDatabaseService } from 'src/app/services/providers/registration-database.service';

@Component({
  selector: 'app-registration-database',
  templateUrl: './registration-database.component.html',
  styleUrls: ['./registration-database.component.scss']
})
export class RegistrationDatabaseComponent {

  constructor (private registration_service: RegistrationDatabaseService) { }
  data_injection: DataInjection<Registration> = {

    permission: 'registration',
    title: "Registrations",
    displayed_columns: [
      {
        key: 'user_id',
        type: 'outer_link',
        outer_link: {

          key: 'user_id',
          index: 2,
          format: (value) => (value as User)?.first_name + ' ' + (value as User)?.last_name
        },
      },
      {
        key: 'activity_id',
        type: 'outer_link',
        outer_link: {

          key: 'activity_id',
          index: 0,
          format: (value) => (value as Activity)?.title

        },

      },
      {
        key: 'seats'
      },
      {
        key: 'start_date'
      },
      {
        key: 'end_date'
      }
    ],
    data_fetcher: () => this.registration_service.getAllRegistrations().pipe(map(data => {


      return [data.registrations, [data.activities, data.user_types, data.users]];

    }))

  };

  change_injection: ChangeInjection<Registration> = {
    side_panel: 'empty',
    default_state: {
      start_date: parseDate(new Date()),
      end_date: parseDate(new Date()),
      activity_id: '0',
      user_id: '0',
      seats: 0
    },
    data_type: 'Registration',
    fields: [
      {
        key: 'start_date',
        condition: (data) => (data as number) > 0,
        type: 'date'
      },
      {
        key: 'end_date',
        condition: (data) => (data as number) > 0,
        type: 'date'
      },
      {
        key: 'user_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => (choice as User)?.first_name + ' ' + (choice as User)?.last_name,
          index: 3


        }
      },
      {
        key: 'activity_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => {

            return (choice as Activity)?.title;
          },
          index: 1


        }
      }
    ],
    add_service: registration => this.registration_service.addNewRegistration(registration),
    modify_service: (key, data) => this.registration_service.modifyRegistration(key, data),
    delete_service: key => this.registration_service.deleteRegistration(key),
    identifier: (data) => data.start_date + " " + data.end_date,
  };

}
