import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListPopupComponent } from './news-list-popup.component';
import { IonicModule } from '@ionic/angular';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    NewsListPopupComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports: [
    NewsListPopupComponent
  ]
})
export class NewsListPopupModule { }
