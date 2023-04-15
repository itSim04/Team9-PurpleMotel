import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { BrowseServicesComponent } from './browse/browse-services.component';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class ServicesModule { }
