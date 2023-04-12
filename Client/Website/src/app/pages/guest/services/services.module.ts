import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseServicesComponent } from './services.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class BrowseServicesModule { }
