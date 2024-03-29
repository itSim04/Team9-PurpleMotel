import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Stock } from 'src/app/models/Stock';
import { map } from 'rxjs';
import { StockDatabaseService } from 'src/app/services/providers/stock-database.service';

@Component({
  selector: 'app-stock-database',
  templateUrl: './stock-database.component.html',
  styleUrls: ['./stock-database.component.scss']
})
export class StockDatabaseComponent {

  data_injection: DataInjection<Stock> = {

    permission: 'stock',
    title: 'Stock',
    buttons: [

      {
        label: 'Deplete',
        action: 'input',
        prompt: 'Would you like to deplete the stock by:',
        title: 'Depleting Stock',
        format: (data: Stock, result: unknown) => (data.available_quantity - (result as number)).toString(),
        concerned_data: 'available_quantity',
        updater: (key, data) => this.stock_service.modifyStock(key, data),
      }

    ],

    displayed_columns: [
      {
        key: 'label'
      },
      {
        key: 'description'
      },
      {
        key: 'available_quantity'
      },
      {
        key: 'is_ingredient',
        type: 'boolean',
        header_alt: "Ingredient?"
      }
    ],
    data_fetcher: () => this.stock_service.getAllStocks().pipe(map(data => [data.stocks, undefined]))
  };

  constructor (private stock_service: StockDatabaseService) { }

  change_injection: ChangeInjection<Stock> = {
    default_state: {
      label: '',
      description: '',
      available_quantity: 1,
      is_ingredient: true
    },

    side_panel: 'empty',

    data_type: 'stock',

    fields: [
      {
        key: 'label',
        type: 'text'
      },
      {
        key: 'description',
        type: 'text'
      },
      {
        key: 'available_quantity',
        type: 'number'
      }
    ],

    toggle:
    {
      key: 'is_ingredient',
      on_value: 'Is ingredient',
      off_value: 'Is not ingredient',

      on_prompt: 'Would you like to unassign the stock $name as an ingredient?',
      off_prompt: 'Would you like to assign the stock $name as an ingredient?',

      on_confirm: 'Unassign as Ingredient',
      off_confirm: 'Assign as Ingredient',

      on_title: 'Assignment change',
      off_title: 'Assignment change'
    },

    add_service: stock => this.stock_service.addNewStock(stock),
    modify_service: (key, data) => this.stock_service.modifyStock(key, data),
    delete_service: key => this.stock_service.deleteStock(key),
    identifier: (data) => '' + data.label,
  };

}
