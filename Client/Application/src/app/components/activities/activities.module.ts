import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { IonicModule } from '@ionic/angular';
import { LanguageModule } from 'src/app/services/language/language.module';
import { ActivitiesModalComponent } from './activities-modal/activities-modal.component';



@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivitiesModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports:[
    ActivitiesComponent
  ]
})
export class ActivitiesModule { }
