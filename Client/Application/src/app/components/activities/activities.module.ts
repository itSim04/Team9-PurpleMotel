import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from 'src/app/pages/guest/profile/profile.module';



@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ProfileModule
  ],
  exports:[
    ActivitiesComponent
  ]
})
export class ActivitiesModule { }
