import { RegistrationDatabaseComponent } from './registration-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    RegistrationDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    RegistrationDatabaseComponent
  ]
})
export class RegistrationDatabaseModule { }
