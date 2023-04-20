import { Order } from './../../models/Order';
import { OrderOverviewDialogComponent } from './../dialogs/order-overview/order-overview.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/models/Food';

@Injectable({
  providedIn: 'root'
})
export class OrderOverviewDialogService {


  constructor (public dialog: MatDialog) { }

  openDialog(data: {food: Map<string, Food>, order: Order}) {
    return this.dialog.open(OrderOverviewDialogComponent, {data: data});
  }

}

