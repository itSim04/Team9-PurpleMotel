import { LanguageModule } from 'src/app/services/language/language.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './booking-details.component';



@NgModule({
  declarations: [
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    LanguageModule
  ],
  exports:[
    BookingDetailsComponent
  ]
})
export class BookingDetailsModule {
  
 }
