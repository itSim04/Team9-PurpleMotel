import { RegistrationDatabaseComponent } from './registration-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    RegistrationDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    RegistrationDatabaseComponent
  ]
})
export class RegistrationDatabaseModule { }
