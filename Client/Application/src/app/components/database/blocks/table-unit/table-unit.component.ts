import { AnimationController } from '@ionic/angular';
import { ChangeComponent, InjectableData } from './../../change/change.component';
import { ChangeInjection } from './../../../../models/Database';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataInjection } from 'src/app/models/Database';
import { extractPermission, Required } from '../../database.component';
import { KeyValue } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  @Input() @Required error = false;

  @Input() outer_data: Map<string, unknown>[] | undefined;

  @Output() download: EventEmitter<void> = new EventEmitter();
  @Output() hover: EventEmitter<[string, Data | undefined]> = new EventEmitter();

  isModalOpen: 0 | 1 | 2 = 0;

  active_data?: InjectableData<Data>;

  constructor (private snackbar: MatSnackBar, private animationCtrl: AnimationController) { }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  closeAdd(data: KeyValue<string, Data | undefined> | undefined) {

    if (data && data.value) {

      this.data_map.set(data.key, data.value);
      this.data.push([data.key, data.value]);
      this.filtered_data.data = this.data;

    }
    this.active_data = undefined;
    this.isModalOpen = 0;

  }

  closeModify(data: KeyValue<string, Data | undefined> | undefined) {

    if (data) {

      const index = this.data.findIndex(t => t[0] == data.key);

      if (data.value) {
        this.data[index] = ([data.key, data.value]);
        this.filtered_data.data = this.data;
      } else {
        this.data.splice(index, 1);
        this.filtered_data.data = this.data;

      }
    }
    this.active_data = undefined;
    this.isModalOpen = 0;

  }

  displayAdd() {

    if (extractPermission('write', this.data_injection.permission)) {

      if (this.change_injection) {

        this.change_injection.affected_data = undefined;
        this.active_data = {

          injection: this.change_injection,
          all_data: this.data_map,
          outer_data: this.outer_data,
          link: this.extra_data_map!,
          permission: this.data_injection.permission,

        };
        this.isModalOpen = 1;
      }

    } else {

      this.snackbar.open('You do not have writing permissions');

    }

  }

  displayModify(data: [string, Data | Data2]) {


    if (this.change_injection) {

      if (this.change_injection) {

        this.change_injection.affected_data = { key: data[0], value: data[1] as Data };
        this.active_data = {

          injection: this.change_injection,
          all_data: this.data_map,
          outer_data: this.outer_data,
          link: this.extra_data_map!,
          permission: this.data_injection.permission,

        };
        this.isModalOpen = 2;
      }

    }

  }


}
