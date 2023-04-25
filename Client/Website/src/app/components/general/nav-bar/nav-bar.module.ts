import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { LanguageModule } from './../../../services/language/language.module';
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
    FormsModule,
    LanguageModule,
    RouterModule,
    MatOptionModule,
    MatSelectModule,
    
    MatDividerModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
