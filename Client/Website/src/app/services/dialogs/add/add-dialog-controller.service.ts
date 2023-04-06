import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeInjection } from 'src/app/models/Database';

@Injectable({
  providedIn: 'root'
})
export class AddDialogControllerService {


  constructor (public dialog: MatDialog) { }

  openDialog<Data>(component: ComponentType<unknown>, injection: ChangeInjection<Data>, link: Map<string, unknown> | undefined = undefined) {

    if (injection) {

      // Modify

      return this.dialog.open(component, {
        data: {

          injection: injection,
          link: link

        }
      });

    } else {

      // Add

      return this.dialog.open(component, {

        data: {

          link: link

        }

      });

    }

  }

}

