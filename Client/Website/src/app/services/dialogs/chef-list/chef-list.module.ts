import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChefListDialogComponent } from './chef-list.component';
import { ChefListDialogService } from '../../utility/chef-list.service';



@NgModule({
  declarations: [
    ChefListDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LanguageModule
  ],
  exports: [
    ChefListDialogComponent
  ],
  entryComponents: [
    ChefListDialogComponent
  ],
  providers: [
    ChefListDialogService
  ]
})
export class ChefListDialogModule { }
