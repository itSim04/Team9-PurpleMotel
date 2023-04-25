import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsComponent } from './activity-details.component';



@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    LanguageModule
  ],
  exports:[
    ActivityDetailsComponent
  ]
})
export class ActivityDetailsModule { }
