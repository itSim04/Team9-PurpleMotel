import { Component } from '@angular/core';
import { PromoDatabaseService } from './promo-database.service';
import { PromoCode } from 'src/app/models/PromoCode';
import { map } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { PromoCodeDatabaseService } from './promo-database.service';

@Component({
  selector: 'app-promo-database',
  templateUrl: './promo-database.component.html',
  styleUrls: ['./promo-database.component.scss']
})
export class PromoDatabaseComponent {
  constructor (private promo_code_service: PromoDatabaseService) { }

  data_injection: DataInjection<PromoCode> = {

    permission: 'promo_code',
    title: 'Promo Codes',
    displayed_columns: [
      {
        key: 'change'
      },
      {
        key: 'start_date'
      },
      {
        key: 'end_date',

      }
    ],
    data_fetcher: () => this.promo_code_service.getAllPromoCodes().pipe(map(data => [data.promo_codes, undefined]))
    
  };

  change_injection: ChangeInjection<PromoCode> = {

    side_panel: 'empty',
    default_state: {
      change: '',
      start_date: new Date(),
      end_date: new Date(),
    },  
    data_type: 'Promo Code',

    fields: [
      {
        key: 'change',
        type: 'text'
      },
      {
        key: 'start_date',
        type: 'date'
      },
      {
        key: 'end_date',
        type: 'date'
      }
    ],
    add_service: promo_code => this.promo_code_service.addNewPromoCode(promo_code),
    modify_service: (key, data) => this.promo_code_service.modifyPromoCode(key, data),
    delete_service: key => this.promo_code_service.deletePromoCode(key),
    identifier: (data) => '' + data.change,
  };

}
