import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IFeedback } from 'src/app/store/reducers/products.reducer';
import {
  createFeedbackPending,
  getProductPending,
} from 'src/app/store/actions/products.actions';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from 'src/app/store/reducers/cart.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent implements OnInit {
  @Input()
  public set feedback(value: IFeedback) {
    if (!value) {
      return;
    }
    this.feedbackForm.patchValue(value);
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private store: Store<IStore>,
    private fb: FormBuilder
  ) {}
  public query: any;
  public product$?: Observable<any> = this.store.select('products', 'item');
  public product: any;
  public currentIndex = 0;
  public isShow = false;
  public isShowDesc = true;
  public isShowFeedback = false;
  public feedbacks: IFeedback[] = [];
  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });

  public next() {
    if (this.currentIndex === this.product.images.length - 1) {
      this.currentIndex = this.currentIndex;
    } else {
      this.currentIndex += 1;
    }
  }
  public prev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.currentIndex;
    } else {
      this.currentIndex -= 1;
    }
  }
  public show() {
    this.isShow = !this.isShow;
  }
  public showDesc() {
    this.isShowFeedback = false;
    this.isShowDesc = true;
  }
  public showFeedback() {
    this.isShowDesc = false;
    this.isShowFeedback = true;
  }

  public async addFeedback(value: IFeedback): Promise<void> {
    this.feedbacks.push(value);
    const feedback = {
      product: this.product._id,
      rate: value.rate,
      advantages: value.advantages,
    };
    this.store.dispatch(
      createFeedbackPending({
        feedback,
      })
    );
    this.feedbackForm.reset();
  }

  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
  }

  public getField(name: string) {
    return this.feedbackForm.get(name);
  }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    const { id } = this.query;

    this.store.dispatch(getProductPending({ id }));
    this.product$?.subscribe((product) => (this.product = product));
  }
}
