import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review.component';
import { ReviewDialogService } from '../../utility/review.service';



@NgModule({
  declarations: [
    ReviewDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    StarRatingModule
  ],
  exports: [
    ReviewDialogComponent
  ],
  entryComponents: [
    ReviewDialogComponent
  ],
  providers: [
    ReviewDialogService
  ]
})
export class ReviewDialogModule { }
