import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListItemComponent } from './news-list-item.component';



@NgModule({
  declarations: [
    NewsListItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    NewsListItemComponent
  ]
})
export class NewsListItemModule { }
