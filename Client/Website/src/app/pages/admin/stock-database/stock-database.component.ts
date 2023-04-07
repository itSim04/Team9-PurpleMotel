import { Component } from '@angular/core';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Stock } from 'src/app/models/Stock';
import { StockDatabaseService } from './stock-database.service';
import { map } from 'rxjs';
import { Data } from '@angular/router';

@Component({
  selector: 'app-stock-database',
  templateUrl: './stock-database.component.html',
  styleUrls: ['./stock-database.component.scss']
})
export class StockDatabaseComponent {

  data_injection: DataInjection<Stock> = {

    title: 'Stock',
    displayed_columns: [
      {
        key:'label'
      },
      {
        key:'description'
      },
      {
        key:'available_quantity'
      },
      {
        key:'is_ingredient', type:'boolean'
      }
    ],
    data_fetcher:()=>this.stock_service.getAllStocks().pipe(map(data => data.stocks))
  }
  
  constructor(private stock_service: StockDatabaseService){}

  change_injection: ChangeInjection<Stock> = {
    default_state:{
      label: '',
      description: '',
      available_quantity: 1,
      is_ingredient: true
    },

    data_type: 'Stocks',
    fields:[
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
        on_value: 'Is not ingredient',
        off_value: 'Is ingredient'
      },
    
    add_service: stock => this.stock_service.addNewStock(stock),
    modify_service: (key,data) => this.stock_service.modifyStock(key, data),
    delete_service: key => this.stock_service.deleteStock(key),
    identifier: (data) => data.label,
  }

}
