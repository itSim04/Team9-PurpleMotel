import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(title: string, body: string, button_true:string, button_false:string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: title,
        body: body,
        button_true: button_true,
        button_false: button_false
      },
    });
  }

}

