import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
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

