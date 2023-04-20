import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogService } from '../../utility/cart.service';
import { CartDialogComponent } from '../cart/cart.component';
import { OrderOverviewDialogComponent } from './order-overview.component';
import { OrderOverviewDialogService } from '../../utility/order-overview.service';


@NgModule({
  declarations: [
    OrderOverviewDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    OrderOverviewDialogComponent
  ],
  entryComponents: [
    OrderOverviewDialogComponent
  ],
  providers: [
    OrderOverviewDialogService
  ]
})
export class OrderOverviewDialogModule { }
