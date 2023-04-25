import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayDialogComponent } from '../dialogs/display/display.component';

@Injectable({
  providedIn: 'root'
})
export class DisplayDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(term: string, title: string) {
    return this.dialog.open(DisplayDialogComponent, {
      data: {

        term: term,
        title: title

      }
    });
  }

}

