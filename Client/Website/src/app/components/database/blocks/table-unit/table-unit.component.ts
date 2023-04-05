import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataInjection } from 'src/app/models/Database';
import { Required } from '../../database.component';

@Component({
  selector: 'app-table-unit',
  templateUrl: './table-unit.component.html',
  styleUrls: ['./table-unit.component.scss'],
})
export class TableUnitComponent<Data, Data2> {

  @Input() @Required  data: [string, Data][] = [];
  @Input() @Required  data_injection!: DataInjection<Data>;
  
  @Input() @Required  filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  @Input() @Required  extra_data: [string, Data2][] | undefined = [];
  
  @Output() modify_click: EventEmitter<[string, Data]> = new EventEmitter();
  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

}
