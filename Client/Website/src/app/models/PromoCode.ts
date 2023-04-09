import { KeyValue } from "@angular/common";

export interface PromoCode {

    change: string,
    start_date: string,
    end_date: string
  
  }

  export interface PromoCodesResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: PromoCode;
    }[];
    
  }

  export interface PromoCodeResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: PromoCode;
    };
  }

  export interface PromoCodePackage{
    promo_code: KeyValue<string,PromoCode>
  }
  
  export interface PromoCodesPackage{
    promo_codes: Map<string,PromoCode>
  }