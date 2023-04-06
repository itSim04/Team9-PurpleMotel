import { BrowsingDialogComponent } from './browsing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowsingDialogService } from './browsing.service';

@NgModule({
  declarations: [
    BrowsingDialogComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrowsingDialogComponent
  ],
  entryComponents: [
    BrowsingDialogComponent
  ],
  providers: [
    BrowsingDialogService
  ]
})
export class BrowsingDialogModule { }
