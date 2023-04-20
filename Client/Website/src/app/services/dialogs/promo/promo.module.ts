import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PromoDialogComponent} from './promo.component';
import { PromoDialogService } from '../../utility/promo.service';



@NgModule({
  declarations: [
    PromoDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    PromoDialogComponent
  ],
  entryComponents: [
    PromoDialogComponent
  ],
  providers: [
    PromoDialogService
  ]
})
export class PromoDialogModule { }
