import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[carouselItem]'
})
export class CarouselDirective {

  constructor (public tpl: TemplateRef<unknown>) {
  }
}


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '.carousel-item'
})
export class CarouselElementDirective {
}

@Component({
  selector: 'app-carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']

})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselDirective) items !: QueryList<CarouselDirective>;
  @ViewChildren(CarouselElementDirective, { read: ElementRef }) private itemsElements !: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel !: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  @Input() browsePopup!: () => void;

  private player !: AnimationPlayer;
  private itemWidth = 0;
  public currentSlide = 0;
  carouselWrapperStyle = {};

  next() {

    console.log(this.itemsElements.first.nativeElement.getBoundingClientRect().width);

    if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(offset: unknown) {

    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
    
  }

  prev() {
    if (this.currentSlide === 0) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  constructor (private builder: AnimationBuilder) {
  }

  ngAfterViewInit() {

    console.log(this.itemsElements.first.nativeElement.getBoundingClientRect().width);
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });

  }

  fixRatio() {

    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.carouselWrapperStyle = {
      width: `${this.itemWidth}px`
    };

    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();

  }

}
