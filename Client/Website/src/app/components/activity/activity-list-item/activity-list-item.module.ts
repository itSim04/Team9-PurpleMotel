import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListItemComponent } from './activity-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    ActivityListItemComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    ActivityListItemComponent
  ]
})
export class ActivityListItemModule { }
