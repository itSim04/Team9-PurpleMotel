import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { MatDividerModule } from '@angular/material/divider';
import { ActivityListItemModule } from 'src/app/components/activities/activity-list-item/activity-list-item.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'src/app/components/general/carousel/carousel.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { BrowseServicesComponent } from './browse/browse-services.component';
import { FacilityModule } from 'src/app/components/facility/facility.module';
import { ActivityOverviewModule } from 'src/app/components/activities/activity-overview/activity-overview.module';



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
    ActivityOverviewModule,
    FacilityModule,
    CarouselModule,
    FooterModule
  ],
  exports: [
    BrowseServicesComponent
  ]
})
export class ServicesModule { }
