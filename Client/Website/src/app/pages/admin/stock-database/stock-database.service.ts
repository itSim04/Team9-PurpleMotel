import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { StocksResponse, Stock, StockResponse, StockPackage, StocksPackage } from "src/app/models/Stock";
import { UrlBuilderService } from "src/app/services/url-builder.service";


@Injectable({
  providedIn: 'root'
})
export class StockDatabaseService {

  constructor (private http: HttpClient, private url: UrlBuilderService) { }

  getAllStocks(): Observable<StocksPackage> {

    try {

      return this.http.get<StocksResponse>(this.url.generateUrl('stocks')).pipe(

        map((response: StocksResponse): StocksPackage => {

          const stocks = new Map<string, Stock>();

          response.data.forEach(stock => {

            stocks.set(stock.id, stock.attributes);

          });

          return {

            stocks: stocks

          };

        }));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }


  }
  getOneStock(id: string): Observable<StockPackage> {

    try {

      return this.http.get<StockResponse>(this.url.generateUrl(`stocks/${id}`)).pipe(
        map((response: StockResponse): StockPackage => {

          return {

            stock: {

              key: response.data.id,
              value: response.data.attributes

            },
          };


        })
      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  addNewStock(stock: Stock) {

    try {

      return this.http.post<StockResponse>(this.url.generateUrl('stocks'), stock).pipe(

        map(result => {

          return result.data.id;

        })

      );

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  modifyStock(stock_id: string, stock: Stock) {

    try {

      return this.http.put(this.url.generateUrl(`stocks/${stock_id}`), stock).pipe(map(() => undefined));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }

  deleteStock(key: string) {

    try {

      return this.http.delete(this.url.generateUrl(`stocks/${key}`)).pipe(map(() => []));

    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));

    }

  }
}