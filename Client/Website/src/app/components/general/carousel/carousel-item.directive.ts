/* eslint-disable @angular-eslint/directive-selector */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[carouselItem]'
})
export class CarouselItemDirective {

  constructor( public tpl : TemplateRef<unknown> ) {
  }

}