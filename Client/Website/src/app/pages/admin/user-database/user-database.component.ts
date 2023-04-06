import { UserInformation, UserInjection } from './../../../models/User';
import { genders } from './../../../services/dialogs/authentication/authentication.utility';
import { UserDatabaseService } from './user-database.service';
import { DataInjection, ChangeInjection } from 'src/app/models/Database';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { map } from 'rxjs';
import { UserType } from 'src/app/models/UserType';
import { formatWord, parsePermission } from 'src/app/components/database/database.component';

@Component({
  selector: 'app-user-database',
  templateUrl: './user-database.component.html',
  styleUrls: ['./user-database.component.scss']
})
export class UserDatabaseComponent {

  constructor (private user_service: UserDatabaseService) { }
  data_injection: DataInjection<User> = {

    title: 'Users',
    displayed_columns: [
      {
        key: 'first_name'
      },
      {
        key: 'last_name'
      },
      {
        key: 'date_of_birth'
      },
      {
        key: 'phone',
      },
      {
        key: 'tier'
      }
    ],
    data_fetcher: () => this.user_service.getAllUsers().pipe(map(data => data.users))

  };

  change_injection: ChangeInjection<User> = {

    side_panel: 'empty',
    default_state: {

      date_of_birth: '1970-01-01',
      email: '',
      first_name: '',
      gender: '0',
      language: '0',
      last_name: '',
      phone: '',
      tier: '0',

    },
    data_type: 'Users',
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
      },
      {
        key: 'phone',
        type: 'text'
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

          ]
        }
      },

    ],
    add_service: user => this.user_service.addNewUser(user),
    modify_service: (key, data) => this.user_service.modifyUser(key, data),
    delete_service: key => this.user_service.deleteUser(key),
    identifier: (data) => data.first_name + " " + data.last_name,



  };

  extra_injection: DataInjection<UserType> = {

    title: 'User Type',
    displayed_columns: [

      {
        key: 'label'
      },
      {
        key: 'description'
      }
    ],
    data_fetcher: () => this.user_service.getAllUserTypes().pipe(map(data => data.users)),
    hover_display: (data) => data.permissions?.map(data => {

      const permissions = parsePermission(data.permission);
      if (permissions.find(t => t == true)) {
       
        return `${formatWord(data.label)}: ${permissions[0] ? 'Delete' : ''} ${permissions[1] ? 'Write' : ''} ${permissions[2] ? 'Read' : ''}`;
      
      } else {

        return '';

      } 
    })

  };

  extra_change_injection: ChangeInjection<UserType> = {

    data_type: 'User Type',
    side_panel: 'permissions',
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
      label: ''

    }

  };

}
