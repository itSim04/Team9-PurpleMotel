import { LanguageModule } from 'src/app/services/language/language.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DisplayDialogComponent } from './display.component';
import { DisplayDialogService } from '../../utility/display.service';



@NgModule({
  declarations: [
    DisplayDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LanguageModule
  ],
  exports: [
    DisplayDialogComponent
  ],
  entryComponents: [
    DisplayDialogComponent
  ],
  providers: [
    DisplayDialogService
  ]
})
export class DisplayDialogModule { }
