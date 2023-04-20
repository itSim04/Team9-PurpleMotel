import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FacilitiesComponent } from './facilities.component';



@NgModule({
  declarations: [
    FacilitiesComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[
    FacilitiesComponent
  ]
})
export class FacilitiesModule { }
