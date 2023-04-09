import { KeyValue } from "@angular/common";

export interface Stock {

    label: string, //Label of a certain stock item
    description: string, //Information about it
    available_quantity: number; //Current available quantity of said stock item
    is_ingredient: boolean;
  
  }

  export interface StocksResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Stock;
    }[];
    
  }

  export interface StockResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Stock;
    };
  }

  export interface StockPackage{
    stock: KeyValue<string,Stock>
  }
  
  export interface StocksPackage{
    stocks: Map<string,Stock>
  }