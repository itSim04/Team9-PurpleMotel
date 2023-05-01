import { Information } from 'src/app/models/Information';
import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { map } from 'rxjs';
import { InformationDatabaseService } from 'src/app/services/providers/information-database.service';

@Component({
  selector: 'app-information-database',
  templateUrl: './information-database.component.html',
  styleUrls: ['./information-database.component.scss']
})
export class InformationDatabaseComponent {

  constructor (private information_service: InformationDatabaseService) { }

  data_injection: DataInjection<Information> = {
    title: 'Informations',

    permission: 'information',

    displayed_columns: [
      {
        key: 'record',
        type: 'text',
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
        type: 'text',
        unique: true,
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

}