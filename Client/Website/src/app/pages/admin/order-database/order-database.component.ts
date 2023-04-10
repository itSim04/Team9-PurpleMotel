import { Food } from 'src/app/models/Food';
import { User } from 'src/app/models/User';
import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { OrderDatabaseService } from './order-database.service';
import { map } from 'rxjs';

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
          index: 3,
          format: (value) => (value as User)?.first_name + ' ' + (value as User)?.last_name
        },
      },
      {
        key: 'food_id',
        type: 'outer_link',
        outer_link: {

          key: 'food_id',
          index: 1,
          format: (value) => (value as Food)?.label

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


      return [data.orders, [data.foods, data.user_types, data.users]];

    }))

  };

  change_injection: ChangeInjection<Order> = {
    side_panel: 'empty',
    default_state: {
      date: new Date(),
      status: "",
      food_id: '0',
      user_id: '0'
    },
    data_type: 'Order',
    fields: [
      {
        key: 'date',
        type: 'date'
      },
      {
        key: 'user_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => (choice as User)?.first_name + ' ' + (choice as User)?.last_name,
          index: 3
        }
      },
      {
        key: 'food_id',
        type: 'outer_selection',
        outer_choices: {

          format: (choice) => {

            return (choice as Food)?.label;
          },
          index: 1
        }
      }
    ],
    add_service: order => this.order_service.addNewOrder(order),
    modify_service: (key, data) => this.order_service.modifyOrder(key, data),
    delete_service: key => this.order_service.deleteOrder(key),
    identifier: (data) => data.date + " "
  };
}