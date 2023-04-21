import { FooterModule } from './../../../components/general/footer/footer.module';
import { NavBarModule } from './../../../components/general/nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageModule } from 'src/app/services/language/language.module';
import { AdminDashboardComponent } from './admin-dashboard.component';



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    LanguageModule,
    RouterModule,
    NavBarModule,
    FooterModule
  ],
  exports:
  [
    AdminDashboardComponent
  ]
})
export class AdminDashboardModule { }
