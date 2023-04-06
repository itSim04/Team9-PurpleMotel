import { DatabaseModule } from './../../../components/database/database.module';
import { UserDatabaseComponent } from './user-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,

  ],
  exports: [
    UserDatabaseComponent
  ]
})
export class UserDatabaseModule { }
