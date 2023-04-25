import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NewsDatabaseComponent } from 'src/app/pages/admin/news-database/news-database.component';
import { NewsListPopupComponent } from './news-list-popup.component';



@NgModule({
  declarations: [
    NewsListPopupComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    LanguageModule
  ],
  exports: [
    NewsListPopupComponent
  ]
})
export class NewsListPopupModule { }
