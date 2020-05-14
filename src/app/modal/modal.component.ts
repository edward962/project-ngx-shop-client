import {
  Component,
  ComponentFactory,
  ComponentRef,
  HostListener,
  Injector,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'ng-shop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef, static: false })
  public modal!: ViewContainerRef;

  public childComponent!: ComponentFactory<any>;
  public isOpen: boolean = false;
  public modalContext!: ComponentRef<any>;
  public refInjector!: Injector;
  public component!: Type<any>;

  public constructor(private _modalService: ModalService) {}

  public ngOnInit(): void {
    this._modalService.modalSequence$.subscribe(
      ({ component, resolver, context }: any) => {
        if (!component) {
          this.close();
          return;
        }
        this.isOpen = true;
        this.childComponent = resolver.resolveComponentFactory(component);
        this.modalContext = this.modal.createComponent(this.childComponent, 0);
        Object.keys(context).forEach(
          (key: string) => (this.modalContext.instance[key] = context[key]),
        );
      },
    );
  }

  @HostListener('window:keyup', ['$event.keyCode'])
  public close(code: number = 27): void {
    if (code !== 27) {
      return;
    }
    // tslint:disable-next-line:no-unused-expression
    this.modalContext && this.modalContext.destroy();
    this.isOpen = false;
  }
}
