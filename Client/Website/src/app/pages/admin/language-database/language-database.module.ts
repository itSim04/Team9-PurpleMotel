import { LanguageDatabaseComponent } from './language-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    LanguageDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    LanguageDatabaseComponent
  ]
})
export class LanguageDatabaseModule { }
