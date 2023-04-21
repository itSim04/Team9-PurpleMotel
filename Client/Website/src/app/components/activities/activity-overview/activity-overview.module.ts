import { LanguageModule } from 'src/app/services/language/language.module';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityOverviewComponent } from './activity-overview.component';



@NgModule({
  declarations: [
    ActivityOverviewComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    LanguageModule
  ],
  exports: [
    ActivityOverviewComponent
  ]
})
export class ActivityOverviewModule { }
