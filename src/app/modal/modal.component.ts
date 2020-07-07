import {
  Component,
  ComponentFactory,
  ComponentRef,
  HostListener,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'ngx-shop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef, static: false })
  public modal!: ViewContainerRef;

  // tslint:disable-next-line:no-any
  public childComponent!: ComponentFactory<any>;
  public isOpen = false;
  // tslint:disable-next-line:no-any
  public modalContext!: ComponentRef<any>;
  // tslint:disable-next-line:no-any
  public component!: Type<any>;

  public constructor(
    private readonly _modalService: ModalService,
    private readonly _cfr: ComponentFactoryResolver,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._modalService.modalSequence$.subscribe(
      // tslint:disable-next-line:no-any
      ({ component, context }: any): void => {
        if (!component) {
          this.close();
          return;
        }
        this.isOpen = true;
        this.renderer.addClass(document.querySelector('html'), 'no-scroll');
        this.childComponent = this._cfr.resolveComponentFactory(component);
        this.modalContext = this.modal.createComponent(this.childComponent, 0);
        Object.keys(context).forEach(
          (key: string): void =>
            (this.modalContext.instance[key] = context[key])
        );
        this.cdr.detectChanges();
      }
    );
  }

  @HostListener('window:keyup', ['$event.keyCode'])
  public close(code = 27): void {
    if (code !== 27) {
      return;
    }
    this.renderer.removeClass(document.querySelector('html'), 'no-scroll');
    if (this.modalContext) {
      this.modalContext.destroy();
    }
    this.isOpen = false;
    this.cdr.detectChanges();
  }
}
