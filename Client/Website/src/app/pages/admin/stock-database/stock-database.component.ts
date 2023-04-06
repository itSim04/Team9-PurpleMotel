import { Component } from '@angular/core';
import { DataInjection } from 'src/app/models/Database';
import { Stock } from 'src/app/models/Stock';
import { StockDatabaseService } from './stock-database.service';
import { map } from 'rxjs';

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
}
