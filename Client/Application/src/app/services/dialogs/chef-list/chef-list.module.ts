import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefListDialogService } from './chef-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChefListDialogComponent } from './chef-list.component';



@NgModule({
  declarations: [
    ChefListDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ChefListDialogComponent
  ],
  entryComponents: [
    ChefListDialogComponent
  ],
  providers: [
    ChefListDialogService
  ]
})
export class ChefListDialogModule { }
