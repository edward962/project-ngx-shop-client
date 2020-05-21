import {
  Component,
  ComponentFactory,
  ComponentRef,
  HostListener,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './modal.service';


@Component({
  selector: 'ngx-shop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef, static: false })
  public modal!: ViewContainerRef;

  public childComponent!: ComponentFactory<any>;
  public isOpen = false;
  public modalContext!: ComponentRef<any>;
  public component!: Type<any>;

  public constructor(private _modalService: ModalService) {
  }

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
  public close(code = 27): void {
    if (code !== 27) {
      return;
    }
    if (this.modalContext) {
      this.modalContext.destroy();
    }
    this.isOpen = false;
  }
}
