import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { Column, DataInjection } from 'src/app/models/Database';
import { formatPrice, formatWord, Required } from '../../database.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<Data, Data2> implements AfterViewInit {

  @Input() @Required data: [string, Data][] = [];
  @Input() @Required data_injection!: DataInjection<Data>;
  @Input() @Required filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  @Input() @Required extra_data: [string, Data2][] | undefined = [];
  @Input() @Required loading = false;

  @Output() modify_click: EventEmitter<[string, Data]> = new EventEmitter();
  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

    this.filtered_data.paginator = this.paginator;
    this.filtered_data.sort = this.sort;

  }

  formatPrice(price: number): string {

    return formatPrice(price);

  }

  formatWord(word: string | number | symbol | undefined) {

    return formatWord(word);

  }

  formatDataField(col: Column<Data>, element: [number, Data]) {


    switch (col.type) {

      case "link":

        if (col.link) {

          return col.link.format(this.getExtra(element[1][col.link.key]));

        } else {

          throw new Error("Type Link requires Format");

        }

      case "price":

        return this.formatPrice(element[1][col.key] as number);

      case "custom":

        if (col.custom) {

          return col.custom(element[1]);

        } else {

          throw new Error("Type Custom requires Format");

        }

      default:

        return element[1][col.key];

    }


  }

  getExtra(id: unknown) {

    const temp = this.extra_data?.find(value => value[0] == id)?.[1];

    if (temp) {

      return temp;

    } else {

      return undefined;

    }


  }

  get getDisplayedColumnsKey() {

    return this.data_injection.displayed_columns.map(t => t.key);


  }




}
