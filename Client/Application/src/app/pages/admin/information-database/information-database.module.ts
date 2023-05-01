import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDatabaseComponent } from './information-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';

@NgModule({
  declarations: [
    InformationDatabaseComponent
  ],
  imports: [

    CommonModule,
    DatabaseModule

  ],
  exports: [
    InformationDatabaseComponent
  ]
})
export class InformationDatabaseModule { }
