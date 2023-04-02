import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDialogControllerService } from './add-dialog-controller.service';



@NgModule({
  
  imports: [
    CommonModule,
  ],
  providers: [
    AddDialogControllerService
  ]
})
export class AddDialogControllerModule { }
