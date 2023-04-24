import { AuthenticationDialogService } from './../../../services/utility/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserType } from 'src/app/models/UserType';
import { KeyValue } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Field, Toggle, StaticField, ChangeInjection, Column, ExtraColumn } from 'src/app/models/Database';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { extractPermission, formatWord, isNum } from '../database.component';
import { User } from 'src/app/models/User';
import { ConfirmationDialogService } from 'src/app/services/utility/confirmation.service';
import { WarningDialogService } from 'src/app/services/utility/warning.service';
import { ImagePickerConf, NgpImagePickerComponent } from 'ngp-image-picker';
import { InformationDatabaseService } from 'src/app/services/providers/information-database.service';


export function areEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) {
      return false;
    }

    for (const [key, value] of a.entries()) {
      if (!b.has(key) || !areEqual(value, b.get(key))) {
        return false;
      }
    }

    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return a === b;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !areEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

export function clone(obj: any) {

  if (obj == null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Map) {
    const clonedMap = new Map();
    for (const [key, value] of obj.entries()) {
      clonedMap.set(key, clone(value));
    }
    return clonedMap;
  }

  const temp = new obj.constructor();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      temp[key] = clone(obj[key]);
    }
  }
  return temp;

}

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent<Data extends { [key: string]: string | boolean | number | unknown[]; }> {

  onImageChange($event: any, image: { filename: string, base64: string; }, image_id: number) {

    // console.log(image, $event);

    if ($event) {

      if (image.filename) {

        const filename = image?.filename!.split('/')!;
        this.image_service.modifyImage($event, this.data_type, this.old_data?.key!, filename[filename.length - 1]).subscribe((result) => {

          this.images[image_id].base64 = $event.split(',')[1];

        });


      } else {

        this.image_service.storeImage($event, this.data_type, this.old_data?.key!).subscribe((result) => {


          this.images[image_id] = {

            filename: result.data.filename,
            base64: $event.split(',')[1]

          };

          console.log(this.images);

          this.images.push({

            filename: '',
            base64: '',

          });

        });
      }

    } else {

      const filename = image?.filename!.split('/')!;
      this.image_service.deleteImage(filename[filename.length - 1], this.data_type, this.old_data?.key!).subscribe((result) => {

        this.images.splice(this.images.findIndex((data) => data.filename === image?.filename), 1);

      });


    }
  }

  modification_mode = false;
  side_panel: 'images' | 'permissions' | 'empty' | 'table';
  data: Data;
  data_type: string;
  standalone_field?: Field<Data>;
  fields: Field<Data>[];
  toggle?: Toggle<Data>;
  static_fields?: StaticField<Data>[];
  permissions?: {

    rows: string[];
    columns: string[];
    format: (result: boolean[]) => string;
    update: (data: Data, label: string, result: number) => void;
    retrieve: (result: Data, id: string) => boolean[];
    key: keyof Data;

  };

  table?: {

    data: MatTableDataSource<unknown>;
    columns: ExtraColumn[];
    key: keyof Data;
    default_value: unknown;

  };
  readonly old_data?: KeyValue<string, Data>;
  readonly add_service: (data: Data) => Observable<string>;
  readonly modify_service: (key: string, data: Data) => Observable<undefined>;
  readonly delete_service: (key: string) => Observable<string[]>;
  readonly identifier: (data: Data) => string;
  readonly modification_rule;
  readonly permission;

  readonly size: number;

  readonly outer_data: Map<string, unknown>[] | undefined;
  readonly all_data: Map<string, Data>;

  readonly linked_data: Map<string, unknown>;

  uniqueness: boolean = true;

  images: {

    filename: string,
    base64: string;

  }[] = [];

  imagePickerConf: ImagePickerConf = {

    borderRadius: '4px',
    language: 'en',
    width: '32vw',
    height: '48vh',
    aspectRatio: 8 / 6,
    hideAddBtn: true,

  };

  current_image = 0;

  next() {

    if (this.current_image + 1 < this.images.length) {

      this.current_image++;

    }

  }
  prev() {

    if (this.current_image > 0) {

      this.current_image--;

    }

  }

  constructor (@Inject(MAT_DIALOG_DATA) public injected_data: { injection: ChangeInjection<Data>, link: Map<string, unknown>; permission: string; outer_data: Map<string, unknown>[] | undefined; all_data: Map<string, Data>; }, private confirmation_controller: ConfirmationDialogService, private warning_controller: WarningDialogService, public dialog: MatDialog, private dialogRef: MatDialogRef<ChangeComponent<Data>>, private snackbar: MatSnackBar, private router: Router, private authentication: AuthenticationDialogService, private image_service: InformationDatabaseService) {


    this.linked_data = injected_data.link;

    this.add_service = injected_data.injection?.add_service;
    this.modify_service = injected_data.injection.modify_service;
    this.delete_service = injected_data.injection.delete_service;
    this.identifier = injected_data.injection.identifier;


    this.permission = injected_data.permission;
    this.outer_data = injected_data.outer_data;
    this.size = injected_data.injection.size || 1;
    this.all_data = injected_data.all_data;

    this.permissions = injected_data.injection.permissions;
    this.modification_rule = injected_data.injection.modification_rule || (data => true);
    this.side_panel = injected_data.injection.side_panel;
    this.toggle = injected_data.injection.toggle;
    this.data_type = injected_data.injection.data_type;
    this.fields = injected_data.injection.fields;
    this.standalone_field = injected_data.injection.standalone_field;
    this.static_fields = injected_data.injection.static_fields;

    if (injected_data.injection.affected_data) {

      this.old_data = injected_data.injection.affected_data;
      image_service.browseImages(this.data_type, this.old_data?.key!).subscribe((result) => {

        console.log(result);
        this.images = result.data;
        this.images.push({

          filename: '',
          base64: ''

        });

      });

      console.log(this.old_data);

      this.data = clone(injected_data.injection.affected_data.value);
      this.modification_mode = true;

    } else {

      this.old_data = undefined;
      this.data = clone(injected_data.injection.default_state);
      this.modification_mode = false;

    }
    if (injected_data.injection.table) {
      this.table = {

        ...injected_data.injection.table,
        default_value: clone(injected_data.injection.table.default_value),
        data: new MatTableDataSource(this.data[injected_data.injection.table.key] as unknown[])

      };
    }
    console.log((this.data as unknown as User).gender);

  }

  add() {

    if (!this.fieldsCompleteness.length && this.differenceCheck) {

      this.uniqueness = true;
      this.fields.forEach(field => {

        if (field.unique) {


          this.all_data.forEach((value, key) => {

            if (value[field.key] == this.data[field.key]) {

              this.uniqueness = false;

            }

          });


        }

      });

      if (this.uniqueness) {

        const dialogRef = this.confirmation_controller.openDialog(`Add ${this.data_type}`, `Would you like to add the ${this.data_type} ${this.identifier(this.data)}`, "Add", "Cancel");
        dialogRef.afterClosed().subscribe(confirmation => {

          if (confirmation) {

            this.add_service(this.data).subscribe(

              {
                next: result => {

                  this.dialogRef.close({ key: result, value: this.data });

                },
                error: error => {

                  if (error.status == 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('id');
                    localStorage.removeItem('token_time');
                    this.router.navigate(['/home']);
                    this.dialogRef.close();
                    this.authentication.openDialog('login');
                  }


                }
              });

          }
        });
      }
    }

  }

  modify() {


    if (!this.fieldsCompleteness.length && this.differenceCheck) {



      if (extractPermission('write', this.permission)) {



        if (this.old_data) {


          this.uniqueness = true;
          this.fields.forEach(field => {

            if (field.unique) {


              this.all_data.forEach((value, key) => {

                if (value[field.key] == this.data[field.key] && value[field.key] != this.old_data?.value[field.key]) {

                  this.uniqueness = false;

                }

              });


            }

          });

          if (this.uniqueness) {

            const dialogRef = this.confirmation_controller.openDialog(`Modify ${this.data_type}`, `Would you like to modify the ${this.data_type} ${this.identifier(this.old_data.value)}`, "Modify", "Cancel");
            dialogRef.afterClosed().subscribe({
              next: confirmation => {

                if (confirmation && this.old_data) {

                  this.modify_service(this.old_data.key, this.data).subscribe(() => {
                    if (this.old_data) {

                      this.dialogRef.close({ key: this.old_data.key, value: this.data });
                    }
                  });
                }
              },
              error: error => {

                if (error.status == 401) {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  localStorage.removeItem('id');
                  localStorage.removeItem('token_time');
                  this.dialogRef.close();
                  this.router.navigate(['/home']);
                  this.authentication.openDialog('login');
                }

              }
            });
          }
        }
      } else {

        this.snackbar.open('You do not have writing permissions');

      }

    }
  }

  delete() {

    if (extractPermission('delete', this.permission)) {

      if (this.old_data) {

        const dialogRef = this.confirmation_controller.openDialog(`Delete ${this.data_type}`, `Would you like to delete the ${this.data_type} ${this.identifier(this.old_data.value)}`, "Delete", "Cancel");
        dialogRef.afterClosed().subscribe(confirmation => {

          if (confirmation && this.old_data) {

            this.delete_service(this.old_data.key).subscribe({
              next: result => {

                if (result.length) {

                  this.warning_controller.openDialog("Unable to Delete", result, 'Ok');

                } else if (this.old_data) {

                  this.dialogRef.close({ key: this.old_data.key, value: undefined });

                }

              },
              error: error => {


                if (error.status == 401) {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  localStorage.removeItem('id');
                  localStorage.removeItem('token_time');
                  this.dialogRef.close();
                  this.router.navigate(['/home']);
                  this.authentication.openDialog('login');
                }
              }
            });
          }
        });
      }
    } else {

      this.snackbar.open('You do not have deletion permissions');

    }
  }

  formatWord(data: string) {

    return formatWord(data);
  }

  triggerToggle() {

    if (this.toggle && this.modification_rule(this.data)) {

      if (this.modification_mode) {

        let prompt;

        if (this.data[this.toggle.key] as boolean) {

          if (this.toggle.on_prompt) {

            prompt = this.toggle.on_prompt;
            prompt = prompt.replace('$name', this.identifier(this.data));

          } else {

            prompt = `Would you like to ${this.toggle.on_value} the ${this.data_type} ${this.identifier(this.data)}`;

          }



        } else {


          if (this.toggle.off_prompt) {

            prompt = this.toggle.off_prompt;
            prompt = prompt.replace('$name', this.identifier(this.data));

          } else {

            prompt = `Would you like to ${this.toggle.off_value} the ${this.data_type} ${this.identifier(this.data)}`;

          }


        }

        const dialogRef = this.confirmation_controller.openDialog((!(this.data[this.toggle.key] as boolean) ? (this.toggle.off_title || this.toggle.off_value + ' ' + this.data_type) : (this.toggle.on_title || this.toggle.on_value + ' ' + this.data_type)), prompt, !(this.data[this.toggle.key] as boolean) ? (this.toggle.off_confirm || this.toggle.off_value) : (this.toggle.on_confirm || this.toggle.on_value), 'Cancel');

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

  formatOuterChoice(field: Field<Data>, type: KeyValue<string, unknown>) {

    if (field.outer_choices && this.outer_data) {

      let temp = field.outer_choices.format(type.value);


      if (field.outer_choices.pivot_index && field.outer_choices.pivot_format) {

        temp = field.outer_choices.pivot_format(this.outer_data[field.outer_choices.pivot_index].get(temp));

      }

      return temp;

    }

    return undefined;

  }

  deleteData(id: number) {

    (this.data[this.table!.key] as unknown[]).splice(id, 1);
    this.table!.data.data = this.data[this.table!.key] as unknown[];

  }

  pushData() {

    (this.data[this.table!.key] as unknown[]).push(clone(this.table?.default_value));

    this.table!.data.data = this.data[this.table!.key] as unknown[];

  }
  updateData(col: string, element: any, result: number) {

    element[col] = result;

  }
  formatTableData(element: any, col: string) {

    return element[col];

  }

  getOuter(id: string, index: number) {

    const temp = this.outer_data?.at(index)?.get(id);

    if (temp) {

      return temp;

    } else {

      return undefined;

    }


  }

  debug(id: number, row: string, result: boolean) {

    const old_permissions: boolean[] = this.permissions?.retrieve(this.data, row) || [false, false, false];

    old_permissions[id] = result;

    this.permissions?.update(this.data, row, Number.parseInt(this.permissions.format(old_permissions)));

  }




  areEqual(a: any, b: any) {

    return areEqual(a, b);

  }

  get differenceCheck() {
    return !this.modification_mode || !this.areEqual(this.old_data?.value, this.data);
  }


  get fieldsCompleteness() {

    let temp = [];
    for (const field of this.fields) {


      if (field.condition ? !field.condition(this.data[field.key]) : !this.data[field.key]) {


        temp.push(field.condition_label || 'Missing ' + this.formatLabel(field.key));

      }

    }
    return temp;

  }

  isNum(val: string) {

    return isNum(val);

  }

  formatLabel(word: string | number | symbol) {

    if (!word) return word;

    const splits = word.toString().replaceAll("_", " ").split(" ");

    for (let i = 0; i < splits.length; i++) {

      splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

    }


    return splits.join(" ");
  }

  parseDate(date: string): any {

    return parseDate(new Date(date));

  }

  get getDisplayedColumnsKey() {


    if (this.table) {

      const keys = this.table!.columns.map(t => t.key as string);
      keys.push('buttons');
      return keys;

    } else {

      throw new Error('Table missing information');

    }



  }

  get iterator() {

    const result = [];
    let index = clone(this.size);
    while (index--) {

      result.unshift(index);

    }
    return result;

  }

}
