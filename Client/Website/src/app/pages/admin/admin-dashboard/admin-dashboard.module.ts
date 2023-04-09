import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    LanguageModule,
    RouterModule
  ],
  exports:
  [
    AdminDashboardComponent
  ]
})
export class AdminDashboardModule { }
