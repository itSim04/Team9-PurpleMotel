import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningDialogService } from './warning.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningDialogComponent } from './warning.component';



@NgModule({
  declarations: [
    WarningDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    WarningDialogComponent
  ],
  entryComponents: [
    WarningDialogComponent
  ],
  providers: [
    WarningDialogService
  ]
})
export class WarningDialogModule { }
