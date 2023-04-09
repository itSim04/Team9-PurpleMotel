import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDatabaseComponent } from './stock-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    StockDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ]
})
export class StockDatabaseModule { }
