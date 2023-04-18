import { FoodDatabaseComponent } from './food-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';




@NgModule({
  declarations: [
    FoodDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    FoodDatabaseComponent
  ]
})
export class FoodDatabaseModule { }
