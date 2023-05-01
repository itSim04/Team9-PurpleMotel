import { ProfileModule } from './../profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { NewsListItemModule } from 'src/app/components/news/news-list-item/news-list-item.module';
import { LanguageModule } from 'src/app/services/language/language.module';
import { NewsListItemComponent } from 'src/app/components/news/news-list-item/news-list-item.component';
import { NewsListPopupModule } from 'src/app/components/news/news-list-popup/news-list-popup.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NewsListItemModule,
    NewsListPopupModule,
    LanguageModule,
    ProfileModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
