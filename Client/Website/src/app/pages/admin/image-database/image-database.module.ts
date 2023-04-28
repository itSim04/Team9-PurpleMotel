
import { NgpImagePickerModule } from 'ngp-image-picker';
import { FooterModule } from './../../../components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDatabaseComponent } from './image-database.component';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    ImageDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    NgpImagePickerModule,
    LanguageModule
  ]
})
export class ImageDatabaseModule { }
