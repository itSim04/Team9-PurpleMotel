import { ChangeComponent } from './../../change/change.component';
import { ChangeInjection } from './../../../../models/Database';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataInjection } from 'src/app/models/Database';
import { Required } from '../../database.component';
import { KeyValue } from '@angular/common';
import { AddDialogControllerService } from 'src/app/services/dialogs/add/add-dialog-controller.service';

@Component({
  selector: 'app-table-unit',
  templateUrl: './table-unit.component.html',
  styleUrls: ['./table-unit.component.scss']
})
export class TableUnitComponent<Data, Data2> {

  @Input() @Required data: [string, Data][] = [];
  @Input() @Required data_map: Map<string, Data> = new Map();
  @Input() @Required data_injection!: DataInjection<Data>;

  @Input() @Required change_injection?: ChangeInjection<Data>;

  @Input() @Required filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  @Input() @Required extra_data: [string, Data2][] | undefined = [];
  @Input() @Required extra_data_map: Map<string, Data2> | undefined = new Map();
  @Input() @Required loading = false;

  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

  constructor (private add_service: AddDialogControllerService) { }

  displayAdd() {

    if (this.change_injection) {

      this.change_injection.affected_data = undefined;
      const dialogRef = this.add_service.openDialog<Data>(ChangeComponent, this.change_injection, this.extra_data_map);
      dialogRef.afterClosed().subscribe((result: KeyValue<string, Data>) => {

        if (result) {

          this.data_map.set(result.key, result.value);
          this.data.push([result.key, result.value]);
          this.filtered_data.data = this.data;

        }
      });

    }

  }

  displayModify(data: [string, Data | Data2]) {


    if (this.change_injection) {

      this.change_injection.affected_data = { key: data[0], value: data[1] as Data };

      const dialogRef = this.add_service.openDialog<Data>(ChangeComponent, this.change_injection, this.extra_data_map);
      dialogRef.afterClosed().subscribe(result => {


        const index = this.data.findIndex(t => t[0] == data[0]);

        if (result) {

          if (result.value) {

            this.data[index] = ([result.key, result.value]);
            this.filtered_data.data = this.data;

          } else {

            this.data.splice(index, 1);
            this.filtered_data.data = this.data;

          }
        }
      });

    }

  }


}
