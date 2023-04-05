import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeInjection, DataInjection } from 'src/app/models/Database';
import { Required } from '../../database.component';

@Component({
  selector: 'app-table-unit',
  templateUrl: './table-unit.component.html',
  styleUrls: ['./table-unit.component.scss'],
})
export class TableUnitComponent<Data, Data2> {

  @Input() @Required data: [string, Data][] = [];
  @Input() @Required data_map: Map<string, Data> = new Map();
  @Input() @Required data_injection!: DataInjection<Data>;

  @Input() @Required change_injection?: ChangeInjection<Data>;

  @Input() @Required filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  @Input() @Required extra_data: [string, Data2][] | undefined = [];
  @Input() @Required extra_data_map: Map<string, Data2> | undefined = new Map();

  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

  

}
