import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseServicesComponent } from './services.component';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { MatDividerModule } from '@angular/material/divider';
import { ActivityListItemModule } from 'src/app/components/activity/activity-list-item/activity-list-item.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'src/app/components/general/carousel/carousel.module';



@NgModule({
  declarations: [
    BrowseServicesComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    MatDividerModule,
    MatGridListModule,
    ActivityListItemModule,
    CarouselModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class BrowseServicesModule { }
