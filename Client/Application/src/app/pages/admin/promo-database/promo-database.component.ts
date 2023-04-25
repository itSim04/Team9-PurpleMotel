import { RoomType } from './../../../models/RoomType';
import { Component } from '@angular/core';
import { PromoCode } from 'src/app/models/PromoCode';
import { map } from 'rxjs';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';
import { UserType } from 'src/app/models/UserType';
import { parseDate } from '../../authentication/authentication.utility';
import { PromoDatabaseService } from './promo-database.service';

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
    data_fetcher: () => this.promo_code_service.getAllFullPromoCodes().pipe(map(data => [data.promo_codes, [data.users, data.user_types, data.rooms, data.room_types]])),

  };

  change_injection: ChangeInjection<PromoCode> = {

    side_panel: 'empty',
    default_state: {
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
        type: 'text'
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
      }
    ],
    add_service: promo_code => this.promo_code_service.addNewPromoCode(promo_code),
    modify_service: (key, data) => this.promo_code_service.modifyPromoCode(key, data),
    delete_service: key => this.promo_code_service.deletePromoCode(key),
    identifier: (data) => '' + data.change,
  };

}