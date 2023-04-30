
import { NgpImagePickerModule } from 'ngp-image-picker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDatabaseComponent } from './image-database.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ImageDatabaseComponent
  ],
  imports: [
    CommonModule,
    NgpImagePickerModule,
    LanguageModule,
    IonicModule.forRoot()
  ]
})
export class ImageDatabaseModule { }
