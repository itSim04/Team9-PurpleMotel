import { UserDatabaseComponent } from './user-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    UserDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    UserDatabaseComponent
  ]
})
export class UserDatabaseModule { }
