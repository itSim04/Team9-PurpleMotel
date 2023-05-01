import { LanguageDatabaseComponent } from './language-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    LanguageDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    LanguageDatabaseComponent
  ]
})
export class LanguageDatabaseModule { }
