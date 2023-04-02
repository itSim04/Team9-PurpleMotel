import { UserDatabaseComponent } from './user-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserDatabaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserDatabaseComponent
  ]
})
export class UserDatabaseModule { }
