import { LanguageDatabaseService } from './services/providers/language-database.service';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InformationDatabaseService } from './services/providers/information-database.service';

declare global {
  interface Map<K, V> {
    getPair(property: K): KeyValue<K, V>;

  }
}

if (!Map.prototype.getPair) {

  Map.prototype.getPair = function <K, V>(property: K): KeyValue<K, V> {

    return {

      key: property,
      value: this.get(property)

    };

  };

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Application';


  constructor (information_service: InformationDatabaseService) {

    information_service.getTerms().subscribe(data => {

      localStorage.setItem('information', JSON.stringify(data));

    });

  }

  

}
