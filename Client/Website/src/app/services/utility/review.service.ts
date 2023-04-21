import { ReviewDialogComponent } from './../dialogs/review/review.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuickDialogComponent } from '../dialogs/quick/quick.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(room_id: string) {
    return this.dialog.open(ReviewDialogComponent, { data: { room_id: room_id } });
  }

}

