import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDatabaseComponent } from './stock-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    StockDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,
    NavBarModule
  ]
})
export class StockDatabaseModule { }
