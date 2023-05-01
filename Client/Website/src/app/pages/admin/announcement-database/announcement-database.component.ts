import { extractUserId } from 'src/app/components/database/database.component';
import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Announcement } from 'src/app/models/Announcement';
import { map } from 'rxjs';
import { AnnouncementDatabaseService } from 'src/app/services/providers/announcement-database.service';
import { User } from '../../../../../../Application/src/app/models/User';

@Component({
  selector: 'app-announcement-database',
  templateUrl: './announcement-database.component.html',
  styleUrls: ['./announcement-database.component.scss']
})
export class AnnouncementDatabaseComponent {

  constructor (private announcement_service: AnnouncementDatabaseService) { }

  data_injection: DataInjection<Announcement> = {
    title: 'Announcements',

    permission: 'announcement',

    displayed_columns: [
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'body',
        type: 'text'
      },
      {
        key: 'author_id',
        type: 'outer_link',
        outer_link: {

          index: 0,
          format: (value) => (value as User)?.first_name + " " + (value as User)?.last_name,
          key: 'author_id'

        }
      },
      {
        key: 'concerned_tier',
        type: 'custom',
        custom: (data) => {


          switch (data.concerned_tier.toString()) {

            case '0':

              return 'Guest';
              
            case '1':

              return 'Staff';
              
            case '2':

              return 'Admin';
              

            default:

              throw new Error('Invalid tier');



          }

        }
      }
    ],

    data_fetcher: () => this.announcement_service.getAllAnnouncements().pipe(map(data => [data.announcements, [data.users]]))
  };

  change_injection: ChangeInjection<Announcement> = {

    data_type: 'announcement',

    default_state: {
      author_id: extractUserId()!,
      concerned_tier: '',
      label: '',
      body: '',
    },

    side_panel: 'empty',

    fields: [
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'body',
        type: 'text'
      },
      {
        key: 'author_id',
        type: 'outer_selection',
        readonly: true,
        outer_choices: {

          index: 0,
          key: (choice) => choice[0],
          format: (choice) => {

            return (choice as User)?.first_name + ' ' + (choice as User)?.last_name;

          }

        }
      },
      {
        key: 'concerned_tier',
        type: 'selection',
        choices: {

          choices: [
            ['0', 'Guests'],
            ['1', 'Staff'],
            ['2', 'Admins']
          ],
          key: (choice) => choice[0]

        }
      }
    ],

    add_service: announcement => this.announcement_service.addNewAnnouncement(announcement),
    modify_service: (key, data) => this.announcement_service.modifyAnnouncement(key, data),
    delete_service: (key) => this.announcement_service.deleteAnnouncement(key),
    identifier: data => data.label
  };
}