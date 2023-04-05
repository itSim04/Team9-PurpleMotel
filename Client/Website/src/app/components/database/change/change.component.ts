import { KeyValue } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Field, Toggle, StaticField, ChangeInjection } from 'src/app/models/Database';
import { ConfirmationDialogService } from 'src/app/service/dialogs/confirmation/confirmation.service';
import { WarningDialogService } from 'src/app/service/dialogs/warning/warning.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent<Data> {


  modification_mode = false;
  data: Data;
  data_type: string;
  standalone_field?: Field<Data>;
  fields: Field<Data>[];
  toggle?: Toggle<Data>;
  static_fields?: StaticField<Data>[];
  readonly old_data?: KeyValue<string, Data>;
  readonly add_service: (data: Data) => Observable<string>;
  readonly modify_service: (key: string, data: Data) => Observable<undefined>;
  readonly delete_service: (key: string) => Observable<string[]>;
  readonly identifier: (data: Data) => string;

  readonly linked_data: Map<string, unknown>;

  constructor (@Inject(MAT_DIALOG_DATA) public injected_data: { injection: ChangeInjection<Data>, link: Map<string, unknown>; }, private confirmation_controller: ConfirmationDialogService, private warning_controller: WarningDialogService, public dialog: MatDialog, private dialogRef: MatDialogRef<ChangeComponent<Data>>) {

    this.linked_data = injected_data.link;

    this.add_service = injected_data.injection?.add_service;
    this.modify_service = injected_data.injection.modify_service;
    this.delete_service = injected_data.injection.delete_service;
    this.identifier = injected_data.injection.identifier;
    this.toggle = injected_data.injection.toggle;
    this.data_type = injected_data.injection.data_type;
    this.fields = injected_data.injection.fields;
    this.standalone_field = injected_data.injection.standalone_field;
    this.static_fields = injected_data.injection.static_fields;

    if (injected_data.injection.affected_data) {

      this.old_data = injected_data.injection.affected_data;
      this.data = JSON.parse(JSON.stringify(injected_data.injection.affected_data.value));
      this.modification_mode = true;

    } else {

      this.old_data = undefined;
      this.data = JSON.parse(JSON.stringify(injected_data.injection.default_state));
      this.modification_mode = false;

    }

  }

}
