import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseServicesComponent } from './browse/browse-services.component';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class ServicesModule { }
