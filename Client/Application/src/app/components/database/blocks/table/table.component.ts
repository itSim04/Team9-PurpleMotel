import { QuickDialogService } from './../../../../services/dialogs/quick/quick.service';
import { QuickDialogModule } from './../../../../services/dialogs/quick/quick.module';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { Button, Column, DataInjection } from 'src/app/models/Database';
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
  @Input() @Required loading: boolean = false;

  @Input() outer_data: Map<unknown, unknown>[] | undefined;

  @Output() download: EventEmitter<void> = new EventEmitter();
  @Output() modify_click: EventEmitter<[string, Data]> = new EventEmitter();
  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hovered = '-1';

  constructor (private quick_controller: QuickDialogService) { }
  ngAfterViewInit(): void {

    this.filtered_data.paginator = this.paginator;
    this.filtered_data.sort = this.sort;

  }

  displayQuick(button: Button<Data>, data: [string, Data]) {

    switch (button.action) {

      case 'input':

        const dialogRef = this.quick_controller.openDialog(button.title, button.prompt, 'Ok', 'Cancel');
        dialogRef.afterClosed().subscribe(result => {

          if (result) {

            const goal = button.format(data[1], result);
            (data[1][button.concerned_data] as string) = goal;
            button.updater(data[0], data[1]).subscribe();

          }
        });
        break;

    }

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

          return col.link.format(this.getExtra(element[1][col.link.key]), element[1]);

        } else {

          throw new Error("Type Link requires Format");

        }

      case 'outer_link':

        if (col.outer_link) {

          const temp = this.getOuter(element[1][col.outer_link.key], col.outer_link.index);
          return col.outer_link.format(temp, element[1]);

        } else {

          throw new Error("Type Link requires Format and Index");

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

  getOuter(id: unknown, index: number) {

    const temp = this.outer_data?.at(index)?.get(id);

    if (temp) {

      return temp;

    } else {

      return undefined;

    }


  }

  mark(data: [string, Data]) {

    if (this.data_injection.special_case && this.data_injection.special_case.rule(data[1])) {

      if (this.hovered == data[0]) {

        return `#${this.data_injection.special_case.alt_color}`;

      } else {

        return `#${this.data_injection.special_case.color}`;

      }

    } else {

      if (this.hovered == data[0]) {

        return 'lightgray';

      } else {

        return 'white';

      }
    }


  }

  get getDisplayedColumnsKey() {

    const keys = this.data_injection.displayed_columns.map(t => t.key as string);
    if (this.data_injection.buttons) {

      keys.push('buttons');

    }
    return keys;

  }




}
