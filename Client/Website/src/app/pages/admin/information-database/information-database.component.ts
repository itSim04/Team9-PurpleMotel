import { Information } from 'src/app/models/Information';
import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Announcement } from 'src/app/models/Announcement';
import { map } from 'rxjs';
import { AnnouncementDatabaseService } from 'src/app/services/providers/announcement-database.service';
import { InformationDatabaseService } from 'src/app/services/providers/information-database.service';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-information-database',
  templateUrl: './information-database.component.html',
  styleUrls: ['./information-database.component.scss']
})
export class InformationDatabaseComponent {

  constructor (private information_service: InformationDatabaseService) { }

  data_injection: DataInjection<Information> = {
    title: 'Informations',

    permission: 'announcement',

    displayed_columns: [
      {
        key: 'record',
        type: 'text'
      },
      {
        key: 'value',
        type: 'text'
      }
    ],

    data_fetcher: () => this.information_service.getAllInformations().pipe(map(data => [data.informations, undefined]))
  };

  change_injection: ChangeInjection<Information> = {

    data_type: 'information',

    default_state: {
      record: '',
      value: ''
    },

    side_panel: 'empty',

    fields: [
      {
        key: 'record',
        type: 'text'
      },
      {
        key: 'value',
        type: 'text'
      }
    ],

    add_service: announcement => this.information_service.addNewInformation(announcement),
    modify_service: (key, data) => this.information_service.modifyInformation(key, data),
    delete_service: (key) => this.information_service.deleteInformation(key),
    identifier: data => data.record
  };

  extra_injection: DataInjection<Image> = {
    title: 'Images',

    permission: 'announcement',

    displayed_columns: [
      {
        key: 'model_name',
        type: 'text'
      },
      {
        key: 'url',
        type: 'text'
      }
    ],

    data_fetcher: () => this.information_service.getAllImages().pipe(map(data => [data.images, undefined]))
  };

  extra_change_injection: ChangeInjection<Image> = {

    data_type: 'image',

    default_state: {
      model_name: '',
      url: ''
    },

    side_panel: 'empty',

    fields: [
      {
        key: 'model_name',
        type: 'text'
      },
      {
        key: 'url',
        type: 'text'
      }
    ],

    add_service: image => this.information_service.addNewImage(image),
    modify_service: (key, data) => this.information_service.modifyImage(key, data),
    delete_service: (key) => this.information_service.deleteImage(key),
    identifier: data => data.model_name
  };

}