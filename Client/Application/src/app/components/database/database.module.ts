// import { FilterComponent } from './blocks/filter/filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatabaseComponent } from './database.component';
import { ChangeComponent } from './change/change.component';
// import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
// import { StarRatingModule } from 'angular-star-rating';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [

    // FilterComponent,
    // TableComponent,
    // TableUnitComponent,
    DatabaseComponent,
    ChangeComponent

  ],
  imports: [

    CommonModule,
    FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatOptionModule,
    // LanguageModule,
    // StarRatingModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatProgressBarModule,
    // MatDividerModule,
    // MatDialogModule,
    // MatSelectModule,
    // MatCheckboxModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatButtonModule,
    // MatSnackBarModule
  ],
  exports: [
    DatabaseComponent
  ]
})
export class DatabaseModule { }
