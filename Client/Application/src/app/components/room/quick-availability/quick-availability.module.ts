import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuickAvailabilityComponent } from './quick-availability.component';


@NgModule({
  declarations: [
    QuickAvailabilityComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    // CalendarModule,
    
  ],
  exports: [
    QuickAvailabilityComponent
  ]
})
export class QuickAvailabilityModule { }
