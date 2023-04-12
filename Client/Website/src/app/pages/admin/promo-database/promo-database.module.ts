import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoDatabaseComponent } from './promo-database.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    PromoDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ]
})
export class PromoDatabaseModule { }
