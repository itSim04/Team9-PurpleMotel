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

  constructor (private announcement_service: AnnouncementDatabaseService){}

  data_injection: DataInjection<Announcement> = {

    title: 'Announcements',

    displayed_columns:[
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'body',
        type: 'text'
      }
    ],

    data_fetcher:()=>this.announcement_service.getAllAnnouncements().pipe(map(data => data.announcements)) 
  }
}