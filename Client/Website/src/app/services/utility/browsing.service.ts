import { User } from './../../../../../Application/src/app/models/User';
import { Announcement } from './../../../../../Application/src/app/models/Announcement';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowsingDialogComponent } from '../dialogs/browsing/browsing.component';

@Injectable({
  providedIn: 'root'
})
export class BrowsingDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog<Announcement>(list: Announcement[], users: Map<string, User>) {

    return this.dialog.open(BrowsingDialogComponent, {
      data: {

        announcements: list,
        users: users
      }
    });

  }

}

