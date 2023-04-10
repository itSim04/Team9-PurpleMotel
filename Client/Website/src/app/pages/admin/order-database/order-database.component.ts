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
}