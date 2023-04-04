import { LanguageModule } from './../../service/language/language.module';
import { DatabaseComponent } from './database.component';
import { TableUnitComponent } from './blocks/table-unit/table-unit.component';
import { TableComponent } from './blocks/table/table.component';
import { FilterComponent } from './blocks/filter/filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { StarRatingModule } from 'angular-star-rating';



@NgModule({
  declarations: [

    FilterComponent, 
    TableComponent, 
    TableUnitComponent, 
    DatabaseComponent

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    LanguageModule,
    StarRatingModule
    

  ]
})
export class DatabaseModule { }
