import { RoomDatabaseComponent } from './room-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';




@NgModule({
  declarations: [
    RoomDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,

  ],
  exports: [
    RoomDatabaseComponent
  ]
})
export class RoomDatabaseModule { }
