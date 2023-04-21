import { NgModule } from '@angular/core';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { ServiceDatabaseComponent } from 'src/app/pages/admin/service-database/service-database.component';
import { CommonModule } from '@angular/common';




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
