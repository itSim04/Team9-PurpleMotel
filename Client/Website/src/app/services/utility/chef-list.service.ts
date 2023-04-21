import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChefListDialogComponent } from '../dialogs/chef-list/chef-list.component';

@Injectable({
  providedIn: 'root'
})
export class ChefListDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog() {
    return this.dialog.open(ChefListDialogComponent);
  }

}

