import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { createFeedbackPending } from '../../store/actions/products.actions';
import { IProduct } from 'src/app/interfaces/product.interface';
import { IFeedback } from '../../store/reducers/products.reducer';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent implements OnInit {
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
    console.log(value);
    this.store.dispatch(
      createFeedbackPending({
        feedback: { ...value },
      })
    );
  }

  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
  }

  public getField(name: string) {
    return this.feedbackForm.get(name);
  }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    this.productsService
      .getProductById(this.query.id)
      .subscribe((product) => (this.product = product));
  }
}
