import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDatabaseComponent } from './news-database.component';



@NgModule({
  declarations: [
    NewsDatabaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsDatabaseComponent
  ]
})
export class NewsDatabaseModule { }
