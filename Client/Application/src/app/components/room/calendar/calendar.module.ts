import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { IonicModule } from "@ionic/angular";
import { CalendarComponent } from "./calendar.component";
import { LanguageModule } from "src/app/services/language/language.module";
import { NoopAnimationPlayer } from "@angular/animations";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule.forRoot(),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    LanguageModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
