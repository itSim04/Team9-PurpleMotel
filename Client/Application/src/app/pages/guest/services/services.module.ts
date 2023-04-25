import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseServicesComponent } from './browse/browse-services.component';
import { ActivitiesModule } from '../../../components/activities/activities.module';
import { IonicModule } from '@ionic/angular';
import { FacilitiesModule } from 'src/app/components/facilities/facilities.module';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule,
    ActivitiesModule,
    FacilitiesModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class ServicesModule { }
