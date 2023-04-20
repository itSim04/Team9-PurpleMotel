import { NgModule } from '@angular/core';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { ServiceDatabaseComponent } from 'src/app/pages/admin/service-database/service-database.component';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    ServiceDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,
    NavBarModule
  ],
  exports: [
    ServiceDatabaseComponent
  ]
})
export class ServiceDatabaseModule { }
