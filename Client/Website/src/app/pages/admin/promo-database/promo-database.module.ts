import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoDatabaseComponent } from './promo-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    PromoDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    DatabaseModule
  ],
  exports: [
    PromoDatabaseComponent
  ]
})
export class PromoDatabaseModule { }
