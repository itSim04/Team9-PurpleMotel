import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowsingDialogComponent } from './browsing.component';

@Injectable({
  providedIn: 'root'
})
export class BrowsingDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog<T>(list: T[]) {

    return this.dialog.open(BrowsingDialogComponent, {
      data: list,
    });

  }

}

