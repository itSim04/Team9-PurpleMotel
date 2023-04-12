import { AnnouncementDatabaseComponent } from './announcement-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    AnnouncementDatabaseComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ],
  exports: [
    AnnouncementDatabaseComponent
  ]
})
export class AnnouncementDatabaseModule { }
