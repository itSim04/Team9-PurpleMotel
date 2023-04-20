import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseServicesComponent } from './browse/browse-services.component';
import { ActivitiesModule } from '../../../components/activities/activities.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule,
    ActivitiesModule,
    IonicModule.forRoot()
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class ServicesModule { }
