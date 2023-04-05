import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DataInjection, Column, ChangeInjection } from 'src/app/models/Database';

export function formatWord(word: string | number | symbol | undefined) {

  if (!word) return "";

  const splits = word.toString().replaceAll("_", " ").split(" ");
  for (let i = 0; i < splits.length; i++) {

    splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

  }

  return splits.join(" ");
}

export function parseInt(num: string | number) {

  try {

    return Number.parseFloat(num + "");

  } catch {

    return 0;

  }

}
export function Required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true
  });
}

export function formatPrice(price: number | undefined, reversed = false): string {

  if (price) {

    const numStr = price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    const temp = numArr?.join(',')?.split('').reverse().join('') || numStr;

    if (reversed) {

      return temp + " USD";

    } else {

      return "USD " + temp;

    }

  } else {

    return '';

  }
}



@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent<Data, Data2> {

  @Input() @Required data_injection!: DataInjection<Data>;
  @Input() dual_fetcher: (() => Observable<[Map<string, Data>, Map<string, Data2>]>) | undefined;
  @Input() extra_injection?: DataInjection<Data2>;

  all_data_map!: Map<string, Data>;
  all_data!: [string, Data][];
  all_extra_map?: Map<string, Data2>;
  all_extra?: [string, Data2][];
  filter_by!: Column<Data>;
  extra_filter_by?: Column<Data2>;
  filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  extra_data?: MatTableDataSource<[string, Data2], MatPaginator>;
  filter: string | number = "";
  extra_filter: string | number = "";
  display_hover: [string, Data | undefined] = ["-1", undefined];
  extra_display_hover: [string, Data2 | undefined] = ["-1", undefined];

  @Input() change_injection?: ChangeInjection<Data>;
  @Input() extra_change_injection?: ChangeInjection<Data2>;

  getExtra(id: unknown) {

    const temp = this.all_extra?.find(value => value[0] == id)?.[1];

    if (temp) {

      return temp;

    } else {

      return undefined;

    }

  }

  parseInt(num: string | number) {

    return parseInt(num);

  }

  formatWord(word: string | number | symbol | undefined) {

    return formatWord(word);

  }




}
