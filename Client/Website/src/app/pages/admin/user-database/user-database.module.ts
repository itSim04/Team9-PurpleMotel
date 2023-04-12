import { DatabaseModule } from './../../../components/database/database.module';
import { UserDatabaseComponent } from './user-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    UserDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,
    NavBarModule
  ],
  exports: [
    UserDatabaseComponent
  ]
})
export class UserDatabaseModule { }
