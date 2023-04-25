import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDatabaseComponent } from './news-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    NewsDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    NewsDatabaseComponent
  ]
})
export class NewsDatabaseModule { }
