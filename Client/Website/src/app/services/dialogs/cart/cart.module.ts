import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart.component';
import { CartDialogService } from '../../utility/cart.service';



@NgModule({
  declarations: [
    CartDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CartDialogComponent
  ],
  entryComponents: [
    CartDialogComponent
  ],
  providers: [
    CartDialogService
  ]
})
export class CartDialogModule { }
