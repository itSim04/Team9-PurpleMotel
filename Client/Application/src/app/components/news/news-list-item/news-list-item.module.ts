import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListItemComponent } from './news-list-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NewsListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    
  ],
  exports: [
    NewsListItemComponent
  ]
})
export class NewsListItemModule { }
