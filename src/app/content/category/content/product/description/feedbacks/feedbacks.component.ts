import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../../store/reducers';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modal/modal.service';
import { IProduct } from 'src/app/content/category/store/reducers/products.reducer';
import { IFeedback } from '../../store/reducers/product.reducer';
import { getProductPending, createFeedbackPending } from '../../store/actions/product.actions';

@Component({
  selector: 'ngx-shop-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass'],
})
export class FeedbacksComponent  implements OnInit{


  public query: any;
  public product$?: Observable<any> = this.store.select('product', 'item');
  public product!: IProduct;


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>,
    private  _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {
  }
  public ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    const { id } = this.query;
    this.store.dispatch(getProductPending({ id }));
    this.product$?.subscribe((product: IProduct) => (this.product = product));
 
  }
  public async addFeedback(): Promise<void> {
    const component = await import(
      './addFeedback/add-feedback.component'
    );
    this._modalService.open({
      component: component.AddFeedbackComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
      context: {
        save: (value: IFeedback) => {
          this.store.dispatch(
            createFeedbackPending({
              feedback: { ...value },
            }),
          );
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
    
  }
}

