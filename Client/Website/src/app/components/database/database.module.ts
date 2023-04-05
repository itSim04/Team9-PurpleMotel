import { MatDialogModule } from '@angular/material/dialog';
import { ChangeComponent } from './change/change.component';
import { MatDividerModule } from '@angular/material/divider';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [

    FilterComponent,
    TableComponent,
    TableUnitComponent,
    DatabaseComponent,
    ChangeComponent

  ],
  imports: [

    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    LanguageModule,
    StarRatingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule

  ]
})
export class DatabaseModule { }