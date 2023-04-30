import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { StarRatingModule } from "angular-star-rating";
import { LanguageModule } from "src/app/services/language/language.module";
import { CarouselModule } from "../general/carousel/carousel.module";
import { FooterModule } from "../general/footer/footer.module";
import { FilterComponent } from "./blocks/filter/filter.component";
import { TableUnitComponent } from "./blocks/table-unit/table-unit.component";
import { TableComponent } from "./blocks/table/table.component";
import { ChangeComponent } from "./change/change.component";
import { CompletionComponent } from "./change/completion/completion.component";
import { DatabaseComponent } from "./database.component";
import { NgpImagePickerModule } from "ngp-image-picker";



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
    FooterModule,
    MatTooltipModule,
    LanguageModule,
    StarRatingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    //MatCheckboxModule,
    CarouselModule,
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
