import { LanguageDatabaseService } from './language-database.service';
import { Language } from './../../../models/Language';
import { DataInjection } from './../../../models/Database';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-language-database',
  templateUrl: './language-database.component.html',
  styleUrls: ['./language-database.component.scss']
})
export class LanguageDatabaseComponent {

  data_injection: DataInjection<Language> = {

    displayed_columns: [

      {
        key: 'language'
      },
      {
        key: 'term'
      },
      {
        key: 'value'
      }

    ],

    title: 'Language',
    permission: 'language',
    data_fetcher: () => this.language_service.getAllLanguages().pipe(map(data => [data.languages, undefined]))




  };

  constructor (private language_service: LanguageDatabaseService) { }

}
