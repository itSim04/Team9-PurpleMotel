import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CalendarModule } from './../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAvailabilityComponent } from './quick-availability.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    QuickAvailabilityComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    CalendarModule,
    MatProgressBarModule
  ],
  exports: [
    QuickAvailabilityComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class QuickAvailabilityModule { }
