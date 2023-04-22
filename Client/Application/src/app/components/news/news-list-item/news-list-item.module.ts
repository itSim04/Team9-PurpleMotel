import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListItemComponent } from './news-list-item.component';
import { IonicModule } from '@ionic/angular';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    NewsListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports: [
    NewsListItemComponent
  ]
})
export class NewsListItemModule { }
