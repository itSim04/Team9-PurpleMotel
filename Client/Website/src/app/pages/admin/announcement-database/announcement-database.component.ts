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
      }
    ],

    data_fetcher: () => this.announcement_service.getAllAnnouncements().pipe(map(data => [data.announcements, undefined]))
  };

  change_injection: ChangeInjection<Announcement> = {

    data_type: 'announcement',

    default_state: {
      label: '',
      body: ''
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
      }
    ],

    add_service: announcement => this.announcement_service.addNewAnnouncement(announcement),
    modify_service: (key, data) => this.announcement_service.modifyAnnouncement(key, data),
    delete_service: (key) => this.announcement_service.deleteAnnouncement(key),
    identifier: data => data.label
  };
}