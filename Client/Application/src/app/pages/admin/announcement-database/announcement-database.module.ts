import { AnnouncementDatabaseComponent } from './announcement-database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from 'src/app/components/database/database.module';

@NgModule({
  declarations: [
    AnnouncementDatabaseComponent
  ],
  imports: [
  
    CommonModule,
    DatabaseModule

  ],
  exports: [
    AnnouncementDatabaseComponent
  ]
})
export class AnnouncementDatabaseModule { }
