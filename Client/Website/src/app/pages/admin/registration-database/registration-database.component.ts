import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { DataInjection, ChangeInjection } from 'src/app/models/Database';
import { Registration } from 'src/app/models/Registration';
import { User } from 'src/app/models/User';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { RegistrationDatabaseService } from './registration-database.service';

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
          index: 3,
          format: (value) => (value as User)?.first_name + ' ' + (value as User)?.last_name
        },
      },
      {
        key: 'activity_id',
        type: 'outer_link',
        outer_link: {

          key: 'activity_id',
          index: 1,
          format: (value) => (value as Activity)?.title

        },

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


}
