import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeInjection } from 'src/app/models/Database';

@Injectable({
  providedIn: 'root'
})
export class AddDialogControllerService {


  constructor (public dialog: MatDialog) { }

  openDialog<Data>(component: ComponentType<unknown>, injection: ChangeInjection<Data>, all_map: Map<string, Data>, link: Map<string, unknown> | undefined = undefined, permission: string, outer: Map<unknown, unknown>[] | undefined) {

    if (injection) {

      // Modify

      return this.dialog.open(component, {
        data: {

          injection: injection,
          link: link,
          permission: permission,
          outer_data: outer,
          all_data: all_map

        }
      });

    } else {

      // Add

      return this.dialog.open(component, {

        data: {

          link: link,
          outer_data: outer

        }

      });

    }

  }

}

