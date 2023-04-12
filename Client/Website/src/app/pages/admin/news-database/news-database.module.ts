import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDatabaseComponent } from './news-database.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    NewsDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    NewsDatabaseComponent
  ]
})
export class NewsDatabaseModule { }
