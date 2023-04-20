import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { QuickDialogComponent } from './quick.component';
import { QuickDialogService } from '../../utility/quick.service';



@NgModule({
  declarations: [
    QuickDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    QuickDialogComponent
  ],
  entryComponents: [
    QuickDialogComponent
  ],
  providers: [
    QuickDialogService
  ]
})
export class QuickDialogModule { }
