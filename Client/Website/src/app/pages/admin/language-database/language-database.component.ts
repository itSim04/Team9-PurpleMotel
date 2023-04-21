import { terms } from './../../../services/language/language.module';
import { LanguageList } from './../../../models/LanguageList';
import { ChangeInjection } from 'src/app/models/Database';
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
        key: 'language',
        type: 'link',
        link: {

          key: 'language',
          format: (value) => (value as LanguageList)?.language_name

        }
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

  extra_injection: DataInjection<LanguageList> = {


    displayed_columns: [

      {
        key: 'code_name'
      },
      {
        key: 'language_name'
      }
    ],
    title: 'Language List',
    permission: 'language_list',
    data_fetcher: () => this.language_service.getAllLanguageLists().pipe(map(data => [data.language_lists, undefined]))


  };

  change_injection: ChangeInjection<Language> = {

    data_type: 'language term',
    default_state: {

      language: '0',
      term: '',
      value: ''
      
    },
    fields: [
      {
        key: 'language',
        type: 'selection',
        choices: {
          
          link: true,
          format: (choice) => (choice as LanguageList)?.language_name
          
        }
        
      },
      {
        key: 'term',
        raw: true,
        type: 'selection',
        choices: {

          choices: terms,
          key: (choice) => choice[1] as string

        }
      },
      {
        key: 'value',
        type: 'text'
      }

    ],
    identifier: (data) => data.term,
    side_panel: 'empty',
    add_service: (data) => this.language_service.addNewLanguage(data),
    modify_service: (key, data) => this.language_service.modifyLanguage(key, data),
    delete_service: (key) => this.language_service.deleteLanguage(key),




  };


  constructor (private language_service: LanguageDatabaseService) { }

};
