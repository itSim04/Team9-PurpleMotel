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
    MatIconModule
  ],
  exports:[
    BookingDetailsComponent
  ]
})
export class BookingDetailsModule {
  
 }
