import { KeyValue } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Field, Toggle, StaticField, ChangeInjection } from 'src/app/models/Database';
import { ConfirmationDialogService } from 'src/app/service/dialogs/confirmation/confirmation.service';
import { WarningDialogService } from 'src/app/service/dialogs/warning/warning.service';
import { isNum } from '../database.component';

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

  add() {

    const dialogRef = this.confirmation_controller.openDialog(`Add ${this.data_type}`, `Would you like to add the ${this.data_type} ${this.identifier(this.data)}`, "Add", "Cancel");
    dialogRef.afterClosed().subscribe(confirmation => {

      if (confirmation) {

        this.add_service(this.data).subscribe(result => {

          console.log(result);
          this.dialogRef.close({ key: result, value: this.data });

        });

      }
    });

  }

  modify() {

    if (this.old_data) {

      const dialogRef = this.confirmation_controller.openDialog(`Modify ${this.data_type}`, `Would you like to modify the ${this.data_type} ${this.identifier(this.old_data.value)}`, "Modify", "Cancel");
      dialogRef.afterClosed().subscribe(confirmation => {

        if (confirmation && this.old_data) {

          this.modify_service(this.old_data.key, this.data).subscribe(() => {
            if (this.old_data) {

              this.dialogRef.close({ key: this.old_data.key, value: this.data });
            }
          });
        }
      });
    }


  }


  triggerToggle() {

    if (this.toggle) {

      if (this.modification_mode) {

        const dialogRef = this.confirmation_controller.openDialog((!(this.data[this.toggle.key] as boolean) ? this.toggle.off_value : this.toggle.on_value) + this.data_type, `Would you like to ${!(this.data[this.toggle.key] as boolean) ? this.toggle.off_value : this.toggle.on_value} the ${this.data_type} ${this.identifier(this.data)}`, !(this.data[this.toggle.key] as boolean) ? this.toggle.off_value : this.toggle.on_value, 'Cancel');

        dialogRef.afterClosed().subscribe(result => {

          if (result && this.toggle) {

            (this.data[this.toggle.key] as boolean) = !(this.data[this.toggle.key] as boolean);

          }

        });

      } else {

        (this.data[this.toggle.key] as boolean) = !(this.data[this.toggle.key] as boolean);

      }





    }
  }

  get differenceCheck() {

    return !this.modification_mode || JSON.stringify(this.old_data?.value) != JSON.stringify(this.data);

  }

  get fieldsCompleteness() {

    for (const field of this.fields) {

      if (field.condition ? !field.condition(this.data[field.key]) : !this.data[field.key]) {

        return false;

      }

    }
    return true;

  }

  isNum(val: string) {

    return isNum(val);

  }

  formatLabel(word: string | number | symbol) {

    if (!word) return word;

    const splits = word.toString().replace("_", " ").split(" ");

    for (let i = 0; i < splits.length; i++) {

      splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

    }


    return splits.join(" ");
  }
}
