import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoDatabaseComponent } from './promo-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';



@NgModule({
  declarations: [
    PromoDatabaseComponent
  ],
  imports: [
    CommonModule,
    DatabaseModule
  ]
})
export class PromoDatabaseModule { }
