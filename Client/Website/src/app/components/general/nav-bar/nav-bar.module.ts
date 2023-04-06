import { RouterModule } from '@angular/router';
import { LanguageModule } from './../../../service/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    LanguageModule,
    RouterModule,
    
    MatDividerModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
