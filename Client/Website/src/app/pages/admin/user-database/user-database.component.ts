import { validateEmail } from 'src/app/services/dialogs/authentication/authentication.utility';
import { User, UserInformation, UserInjection } from './../../../models/User';
import { genders } from './../../../services/dialogs/authentication/authentication.utility';
import { DataInjection, ChangeInjection } from 'src/app/models/Database';
import { Component } from '@angular/core';
import { UserAttributes } from 'src/app/models/User';
import { map } from 'rxjs';
import { UserType } from 'src/app/models/UserType';
import { formatWord, parsePermission, extractUser } from 'src/app/components/database/database.component';
import { UserDatabaseService } from 'src/app/services/providers/user-database.service';

@Component({
  selector: 'app-user-database',
  templateUrl: './user-database.component.html',
  styleUrls: ['./user-database.component.scss']
})
export class UserDatabaseComponent {

  constructor (private user_service: UserDatabaseService) { }
  data_injection: DataInjection<User> = {

    title: 'Users',

    permission: 'user',

    special_case: {

      rule: (data) => data.email == extractUser()?.email,
      color: '14274A33',
      alt_color: '14274A66'

    },

    displayed_columns: [
      {
        key: 'first_name',
        type: 'custom',
        custom: (data) => data.first_name + ' ' + data.last_name
      },
      {
        key: 'date_of_birth',
        header_alt: 'Birthday',
        type: 'custom',
        custom: (data) => {

          return data.date_of_birth.slice(8, 10) + '/' + data.date_of_birth.slice(5, 7) + '/' + data.date_of_birth.slice(0, 4);

        }
      },
      {
        key: 'phone',
      },
      {
        key: 'type',
        type: 'link',
        link: {

          format_index: 'label',
          key: 'type',
          format: (value, org) => {

            let tier = '';

            switch (org?.tier) {

              case '0':

                tier = 'Guest';
                break;

              case '1':

                tier = 'Staff';
                break;

              case '2':

                tier = 'Admin';
                break;

              default:

                tier = 'Unidentified';

            }

            if (org?.tier != '2') {

              return tier + " - " + (value as UserType)?.label;

            } else {

              return tier;

            }

          }
        }
      }
    ],
    data_fetcher: () => this.user_service.getAllUsers().pipe(map(data => [data.users, undefined])),
    hover_display: (data) => {

      const result: string[] = [];

      if (data.tier != '2') {
        data.permissions.forEach((permission, label) => {

          const permissions = parsePermission(permission);
          if (permissions.find(t => t == true)) {

            result.push(`${formatWord(label)}: ${permissions[0] ? 'Delete' : ''} ${permissions[1] ? 'Write' : ''} ${permissions[2] ? 'Read' : ''}`);

          }
        });
      }
      return result;

    }
  };

  change_injection: ChangeInjection<User> = {

    side_panel: 'permissions',

    modification_rule: data => data.tier != '2',

    permissions: {

      columns: ['Delete', 'Write', 'Read'],
      rows: ['room', 'user', 'stock', 'user_type', 'room_type', 'language', 'booking'],
      key: 'permissions',

      update: (data: User, label: string, result: number) => data.permissions.set(label, result),

      retrieve: (result: User, label: string) => parsePermission(result.permissions.get(label)),
      format: (result) => {

        return Number.parseInt(`${result[0] ? '1' : 0}${result[1] ? '1' : 0}${result[2] ? '1' : 0}`, 2).toString();

      }

    },
    default_state: {

      date_of_birth: '1970-01-01',
      email: '',
      first_name: '',
      gender: 0,
      language: '0',
      last_name: '',
      phone: '',
      tier: '0',
      type: '0',
      permissions: new Map()

    },
    data_type: 'User',
    fields: [
      {
        key: 'first_name',
        type: 'text'
      },
      {
        key: 'last_name',
        type: 'text'
      },
      {
        key: 'email',
        type: 'text',
        condition: (data) => validateEmail(data as string),
        condition_label: "Invalid Email"
      },
      {
        key: 'phone',
        type: 'text',
        condition: (data) => (data as string).toString().length > 3,
        condition_label: "Invalid Phone Number"
      },
      {
        key: 'tier',
        type: 'selection',
        choices: {
          choices: [
            ['0', 'Guest'],
            ['1', 'Staff'],
            ['2', 'Admin']
          ]
        }
      },
      {
        key: 'gender',
        type: 'selection',
        choices: {
          choices: [

            ['0', genders[0]],
            ['1', genders[1]],
            ['2', genders[2]],
            ['3', genders[3]],

          ],
          key: (choice) => choice[0].toString()
        }
      },
      
      {
        key: 'type',
        type: 'selection',
        condition: (data) => (data as string) != '0',
        choices: {

          link: true,
          format: (choice) => (choice as UserType).label

        }
      }

    ],
    add_service: user => this.user_service.addNewUser(user),
    modify_service: (key, data) => this.user_service.modifyUser(key, data),
    delete_service: key => this.user_service.deleteUser(key),
    identifier: (data) => data.first_name + " " + data.last_name,



  };

  extra_injection: DataInjection<UserType> = {

    title: 'User Type',
    permission: 'user_type',
    displayed_columns: [

      {
        key: 'label'
      },
      {
        key: 'description'
      }
    ],
    data_fetcher: () => this.user_service.getAllUserTypes().pipe(map(data => [data.users, undefined])),
    hover_display: (data) => {

      const result: string[] = [];
      data.permissions.forEach((permission, label) => {

        const permissions = parsePermission(permission);
        if (permissions.find(t => t == true)) {

          result.push(`${formatWord(label)}: ${permissions[0] ? 'Delete' : ''} ${permissions[1] ? 'Write' : ''} ${permissions[2] ? 'Read' : ''}`);

        }
      });
      return result;

    }
  };

  extra_change_injection: ChangeInjection<UserType> = {

    data_type: 'User Type',
    side_panel: 'permissions',
    permissions: {

      columns: ['Delete', 'Write', 'Read'],
      rows: ['room', 'user', 'stock', 'user_type', 'room_type', 'language', 'booking'],
      key: 'permissions',

      update: (data: UserType, label: string, result: number) => data.permissions.set(label, result),

      retrieve: (result: UserType, label: string) => parsePermission(result.permissions.get(label)),
      format: (result) => {

        return Number.parseInt(`${result[0] ? '1' : 0}${result[1] ? '1' : 0}${result[2] ? '1' : 0}`, 2).toString();

      }

    },
    fields: [
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      }
    ],
    add_service: (data) => this.user_service.addNewUserType(data),
    modify_service: (data, id) => this.user_service.modifyUserType(data, id),
    delete_service: (id) => this.user_service.deleteUserType(id),
    identifier: (data) => data.label,
    default_state: {

      description: '',
      label: '',
      permissions: new Map()

    }

  };

};
