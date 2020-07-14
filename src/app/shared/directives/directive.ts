import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
} from '@angular/core';

export enum TooltipPosition {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltip')
  public tooltipTitle: string | undefined;
  @Input()
  public position: TooltipPosition = TooltipPosition.TOP;

  public tooltip: HTMLElement | undefined | null;
  public offset = 10;

  constructor(
    private readonly _el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (this.tooltip) {
      return;
    }
    this.show();
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (!this.tooltip) {
      return;
    }
    this.hide();
  }

  public show(): void {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  public hide(): void {
    if (!this.tooltip) {
      return;
    }
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  public create(): void {
    this.tooltip = this.renderer.createElement('span');
    if (this.tooltipTitle) {
      this.renderer.appendChild(
        this.tooltip,
        this.renderer.createText(this.tooltipTitle)
      );
    }

    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.position}`);
  }

  public setPosition(): void {
    if (!this.tooltip) {
      return;
    }
    const hostPos = this._el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top, left;

    if (this.position === TooltipPosition.TOP) {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.position === TooltipPosition.BOTTOM) {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.position === TooltipPosition.LEFT) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.position === TooltipPosition.RIGHT) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  public ngOnDestroy(): void {
    if (this.tooltip) {
      this.hide();
    }
  }
}
