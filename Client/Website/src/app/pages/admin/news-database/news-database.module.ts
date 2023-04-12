import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDatabaseComponent } from './news-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    NewsDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
    NavBarModule
  ],
  exports: [
    NewsDatabaseComponent
  ]
})
export class NewsDatabaseModule { }
