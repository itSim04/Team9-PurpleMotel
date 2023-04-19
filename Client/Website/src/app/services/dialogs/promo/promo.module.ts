import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PromoComponent} from './promo.component';
import { PromoService } from './promo.service';




@NgModule({
  declarations: [
    PromoComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    PromoComponent
  ],
  entryComponents: [
    PromoComponent
  ],
  providers: [
    PromoService
  ]
})
export class QuickDialogModule { }
