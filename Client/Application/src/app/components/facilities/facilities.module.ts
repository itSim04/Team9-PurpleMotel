import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FacilitiesComponent } from './facilities.component';
import { LanguageModule } from 'src/app/services/language/language.module';
import { FacilitiesModalComponent } from './facilities-modal/facilities-modal.component';



@NgModule({
  declarations: [
    FacilitiesComponent,
    FacilitiesModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports:[
    FacilitiesComponent
  ]
})
export class FacilitiesModule { }
