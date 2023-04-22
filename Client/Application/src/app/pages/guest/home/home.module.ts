import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { NewsListItemModule } from 'src/app/components/news/news-list-item/news-list-item.module';
import { LanguageModule } from 'src/app/services/language/language.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NewsListItemModule,
    LanguageModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
