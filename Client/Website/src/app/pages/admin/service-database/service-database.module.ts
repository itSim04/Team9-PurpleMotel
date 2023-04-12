import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from '../../../components/database/database.module';
import { ServiceDatabaseComponent } from './service-database.component';
import { NavBarComponent } from 'src/app/components/general/nav-bar/nav-bar.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';




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
