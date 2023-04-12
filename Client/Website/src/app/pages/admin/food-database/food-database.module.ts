import { FoodDatabaseComponent } from './food-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    FoodDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule,
    NavBarModule
  ],
  exports: [
    FoodDatabaseComponent
  ]
})
export class FoodDatabaseModule { }
