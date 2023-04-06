import { LanguageModule } from './../../../services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    LanguageModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
