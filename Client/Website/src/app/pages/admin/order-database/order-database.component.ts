import { OrderContains } from './../../../models/OrderContains';
import { Food } from 'src/app/models/Food';
import { User } from 'src/app/models/User';
import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { OrderDatabaseService } from './order-database.service';
import { map } from 'rxjs';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-order-database',
  templateUrl: './order-database.component.html',
  styleUrls: ['./order-database.component.scss']
})
export class OrderDatabaseComponent {

  constructor (private order_service: OrderDatabaseService) { }
  data_injection: DataInjection<Order> = {

    permission: 'order',
    title: "Orders",
    displayed_columns: [
      {
        key: 'user_id',
        type: 'outer_link',
        outer_link: {

          key: 'user_id',
          index: 1,
          format: (value) => (value as User)?.first_name + ' ' + (value as User)?.last_name
        },
      },
      {
        key: 'date'
      },
      {
        key: 'status',
      }
    ],
    data_fetcher: () => this.order_service.getAllOrders().pipe(map(data => {


      return [data.orders, [data.foods, data.users, data.order_contains]];

    })),

    hover_linker: {

      key: 'food',
      index: 0,
      filter: (t1, t2) => !!(t2 as { id: string, quantity: number; }[]).find(t => t.id == (t1 as string)),
      format: (data) => (data[1] as Food)?.label

    }

  };

  change_injection: ChangeInjection<Order> = {
    side_panel: 'table',
    table: {

      columns: [{

        key: 'id',
        type: 'selection',
        outer_link: {

          key: 'id',
          index: 0,
          format: (value) => {
           
            
            return (value as KeyValue<string, Food>)?.value.label

          }

        }

      },
      {

        type: 'text',
        key: 'quantity'
      
    }],
      key: 'food'

    },
    default_state: {
      user_id: '0',
      date: parseDate(new Date()),
      status: "",
      food: []
    },
    data_type: 'Order',
    fields: [
      {
        key: 'date',
        type: 'date',
        readonly: true
      },
      {
        key: 'user_id',
        type: 'outer_selection',
        readonly: true,
        outer_choices: {

          format: (choice) => (choice as User)?.first_name + ' ' + (choice as User)?.last_name,
          index: 1
        }
      },
      // {
      //   key: 'food',
      //   readonly: false,
      //   type: 'outer_choices',
      //   outer_choices: {
      //     retriever: (choice) => {
      //       return (choice as {id: string, quantity: number}[]).map(t => t.id);

      //     },

      //     format: (choice) => {

      //       return (choice as Food)?.label;
      //     },
      //     index: 0
      //   }
      // },
      {
        key: 'status',
        type: 'number'
      }
    ],
    add_service: order => this.order_service.addNewOrder(order),
    modify_service: (key, data) => this.order_service.modifyOrder(key, data),
    delete_service: key => this.order_service.deleteOrder(key),
    identifier: (data) => data.date + " "
  };
}