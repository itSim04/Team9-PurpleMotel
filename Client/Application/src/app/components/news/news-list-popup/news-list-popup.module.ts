import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListPopupComponent } from './news-list-popup.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NewsListPopupComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    NewsListPopupComponent
  ]
})
export class NewsListPopupModule { }
