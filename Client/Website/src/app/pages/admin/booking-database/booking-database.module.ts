import { BookingDatabaseComponent } from './booking-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './../../../components/database/database.module';


@NgModule({
  declarations: [
    BookingDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    BookingDatabaseComponent
  ]
})
export class BookingDatabaseModule { }
