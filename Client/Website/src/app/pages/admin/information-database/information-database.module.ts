import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { InformationDatabaseComponent } from './information-database.component';

@NgModule({
  declarations: [
    InformationDatabaseComponent
  ],
  imports: [

    CommonModule,
    DatabaseModule,
    NavBarModule

  ],
  exports: [
    InformationDatabaseComponent
  ]
})
export class InformationDatabaseModule { }
