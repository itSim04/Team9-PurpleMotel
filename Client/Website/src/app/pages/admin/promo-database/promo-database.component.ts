import { RoomType } from './../../../models/RoomType';
import { Component } from '@angular/core';
import { PromoCode } from 'src/app/models/PromoCode';
import { map } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { User } from 'src/app/models/User';
import { UserType } from 'src/app/models/UserType';
import { Room } from 'src/app/models/Room';
import { PromoDatabaseService } from 'src/app/services/providers/promo-database.service';

@Component({
  selector: 'app-promo-database',
  templateUrl: './promo-database.component.html',
  styleUrls: ['./promo-database.component.scss']
})
export class PromoDatabaseComponent {
  constructor (private promo_code_service: PromoDatabaseService) { }

  data_injection: DataInjection<PromoCode> = {

    permission: 'promo-code',
    title: 'Promo Codes',
    displayed_columns: [
      {
        key: 'change'
      },
      {
        key: 'code'
      },
      {
        key: 'start_date'
      },
      {
        key: 'end_date',
      }
    ],
    data_fetcher: () => this.promo_code_service.getAllFullPromoCodes().pipe(map(data => [data.promo_codes, [data.users, data.user_types, data.rooms, data.room_types]])),

  };

  change_injection: ChangeInjection<PromoCode> = {

    side_panel: 'empty',
    size: 2,
    default_state: {
      exhausted: false,
      code: '',
      concerned_everyone: false,
      concerned_everything: false,
      concerned_room_types: [],
      concerned_rooms: [],
      concerned_user_tiers: [],
      concerned_user_types: [],
      concerned_users: [],
      applied_users: [],
      change: 0,
      start_date: parseDate(new Date()),
      end_date: parseDate(new Date()),
    },
    data_type: 'Promo Code',

    fields: [
      {
        key: 'change',
        type: 'number'
      },
      {
        key: 'code',
        type: 'text',
        unique: true
      },
      {
        key: 'start_date',
        type: 'date'
      },
      {
        key: 'end_date',
        type: 'date'
      },
      {
        key: 'concerned_users',
        type: 'outer_choices',
        outer_choices: {

          index: 0,
          format: (data) => (data as User).first_name + ' ' + (data as User).last_name,

        }
      },
      {
        key: 'concerned_user_types',
        type: 'outer_choices',
        outer_choices: {

          index: 1,
          format: (data) => (data as UserType).label

        }
      },
      {
        key: 'concerned_rooms',
        type: 'outer_choices',
        outer_choices: {

          index: 2,
          format: (data) => (data as Room).label

        }
      },
      {
        key: 'concerned_room_types',
        type: 'outer_choices',
        outer_choices: {

          index: 3,
          format: (data) => (data as RoomType).label

        }
      },
      {
        key: 'concerned_everyone',
        type: 'toggle',
        condition: () => true
      },
      {
        key: 'concerned_everything',
        type: 'toggle',
        condition: () => true
      }
    ],
    add_service: promo_code => this.promo_code_service.addNewPromoCode(promo_code),
    modify_service: (key, data) => this.promo_code_service.modifyPromoCode(key, data),
    delete_service: key => this.promo_code_service.deletePromoCode(key),
    identifier: (data) => data.code,
  };

}
