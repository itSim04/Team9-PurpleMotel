import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[
    ActivitiesComponent
  ]
})
export class ActivitiesModule { }
