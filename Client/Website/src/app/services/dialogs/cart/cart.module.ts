import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDialogService } from './cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './cart.component';



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
