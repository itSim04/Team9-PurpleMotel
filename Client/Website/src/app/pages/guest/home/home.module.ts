import { NewsListPopupModule } from './../../../components/news/news-list-popup/news-list-popup.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NewsListItemModule } from 'src/app/components/news/news-list-item/news-list-item.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    NewsListItemModule,
    NewsListPopupModule
  ]
})
export class HomeModule { }
