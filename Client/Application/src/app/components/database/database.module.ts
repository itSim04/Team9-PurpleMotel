import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatabaseComponent } from './database.component';
import { ChangeComponent } from './change/change.component';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
// import { StarRatingModule } from 'angular-star-rating';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { LanguageModule } from 'src/app/services/language/language.module';
import { TableComponent } from './blocks/table/table.component';
import { TableUnitComponent } from './blocks/table-unit/table-unit.component';
import { FilterComponent } from './blocks/filter/filter.component';


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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    LanguageModule,
    // StarRatingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  exports: [
    DatabaseComponent
  ]
})
export class DatabaseModule { }
