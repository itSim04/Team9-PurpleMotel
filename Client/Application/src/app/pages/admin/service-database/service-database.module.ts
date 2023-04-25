import { NgModule } from '@angular/core';

import { ServiceDatabaseComponent } from 'src/app/pages/admin/service-database/service-database.component';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';




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
