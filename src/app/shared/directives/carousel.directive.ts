import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngShopCarousel]',
})
export class CarouselDirective implements OnInit {

  @Input('ngShopCarouselFrom')
  public images: any[] = [];

  @Input('ngShopCarouselDelay')
  public ms: number = 5000;
  @Input('ngShopCarouselAutoplay')
  public set playAuto(mode: 'on' | 'off') {
    if (!mode) {
      return;
    }
    this.autoplay = mode;
  }

  public autoplay: 'on' | 'off' = 'on';
  public currentView!: EmbeddedViewRef<any>;
  public context: any;
  public index: number = 0;
  private intervalID!: number;

  public constructor(
    private readonly tpl: TemplateRef<any>,
    private readonly vcr: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    this.context = {
      $implicit: this.images[this.index],
      controller: {
        // start: () => this.start(),
        // stop: () => this.stop(),
      },
    };
    this.currentView = this.vcr.createEmbeddedView(this.tpl, this.context);
    // this.start();
  }

  public next(): void {
    this.index++;
    if (this.index >= this.images.length) {
      this.index = 0;
    }
    this.currentView.destroy();
    this.context = {
      ...this.context,
      $implicit: this.images[this.index],
    };
    this.currentView = this.vcr.createEmbeddedView(this.tpl, this.context);
  }

  // public start(): void {
  //   this.intervalID = setInterval(() => {
  //     this.next();
  //   }, this.ms);
  // }

  // public stop(): CarouselDirective {
  //   clearInterval(this.intervalID);
  //   return this;
  // }
}
