import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { NewsListItemModule } from 'src/app/components/news/news-list-item/news-list-item.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    NewsListItemModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
