import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeComponent } from './change/change.component';
import { MatDividerModule } from '@angular/material/divider';
import { LanguageModule } from './../../services/language/language.module';
import { DatabaseComponent } from './database.component';
import { TableUnitComponent } from './blocks/table-unit/table-unit.component';
import { TableComponent } from './blocks/table/table.component';
import { FilterComponent } from './blocks/filter/filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompletionComponent } from './change/completion/completion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgpImagePickerModule } from 'ngp-image-picker';


@NgModule({
  declarations: [

    FilterComponent,
    TableComponent,
    TableUnitComponent,
    DatabaseComponent,
    ChangeComponent,
    CompletionComponent

  ],
  imports: [

    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatTooltipModule,
    LanguageModule,
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
    NgpImagePickerModule
    
  ],
  exports: [
    DatabaseComponent
  ]
})
export class DatabaseModule { }
