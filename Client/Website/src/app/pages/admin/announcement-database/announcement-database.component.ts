import { User } from './../../../models/User';
import { Component } from '@angular/core';
import { AnnouncementDatabaseService } from './announcement-database.service';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Announcement } from 'src/app/models/Announcement';
import { map } from 'rxjs';

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
      label: '',
      body: '',
      author_id: '0',
      concerned_tier: 0
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
        key: 'concerned_tier',
        type: 'selection',
        choices: {

          choices: [['0', 'Guests'], ['1', 'Staff'], ['2', 'Admins']],

        }
      },
      {
        key: 'author_id',
        type: 'outer_selection',
        outer_choices: {

          index: 0,
          format: (choice) => (choice as User)?.first_name + " " + (choice as User)?.last_name

        }
      }
    ],

    add_service: announcement => this.announcement_service.addNewAnnouncement(announcement),
    modify_service: (key, data) => this.announcement_service.modifyAnnouncement(key, data),
    delete_service: (key) => this.announcement_service.deleteAnnouncement(key),
    identifier: data => data.label
  };
}