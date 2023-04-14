import { CarouselComponent, CarouselDirective, CarouselElementDirective } from './carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    CarouselComponent,
    CarouselDirective,
    CarouselElementDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselComponent,
    CarouselDirective,
    CarouselElementDirective,
  ]
})
export class CarouselModule { }
