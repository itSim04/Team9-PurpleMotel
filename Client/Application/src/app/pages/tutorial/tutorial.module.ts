import { TutorialComponent } from './tutorial.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class TutorialModule { }
