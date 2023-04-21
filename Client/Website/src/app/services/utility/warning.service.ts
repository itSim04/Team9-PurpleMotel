import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../dialogs/warning/warning.component';

@Injectable({
  providedIn: 'root'
})
export class WarningDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(title: string, body: string[], button: string) {
    return this.dialog.open(WarningDialogComponent, {
      data: {
        title: title,
        body: body,
        button: button
      },
    });
  }

}

