import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from '../../../components/database/database.module';
import { ServiceDatabaseComponent } from './service-database.component';




@NgModule({
  declarations: [
    ServiceDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    ServiceDatabaseComponent
  ]
})
export class ServiceDatabaseModule { }
