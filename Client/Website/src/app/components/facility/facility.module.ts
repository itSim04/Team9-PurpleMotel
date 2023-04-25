import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityComponent } from './facility.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    FacilityComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    LanguageModule
  ],
  exports:[
    FacilityComponent
  ]
})
export class FacilityModule { }
