import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './../../../components/database/database.module';
import { ActivityDatabaseComponent } from './activity-database.component';




@NgModule({
  declarations: [
    ActivityDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    ActivityDatabaseComponent
  ]
})
export class ActivityDatabaseModule { }
