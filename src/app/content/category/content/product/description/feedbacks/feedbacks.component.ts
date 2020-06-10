import { Component, Input, OnInit } from '@angular/core';
import { IFeedback, IProduct } from '../../../../../../store/reducers/products.reducer';
import { createFeedbackPending, getProductPending } from '../../../../../../store/actions/products.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../../store/reducers';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-shop-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass'],
})
export class FeedbacksComponent  implements OnInit{

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });
  public query: any;
  public product$?: Observable<any> = this.store.select('products', 'item');
  public product!: IProduct;


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>,
    private fb: FormBuilder,
  ) {
  }
  public ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    const { id } = this.query;
    this.store.dispatch(getProductPending({ id }));
    this.product$?.subscribe((product: IProduct) => (this.product = product));
 
  }
  public async addFeedback(value: IFeedback): Promise<void> {
    const feedback = {
      product: this.product._id,
      rate: value.rate,
      advantages: value.advantages,
    };
    this.store.dispatch(
      createFeedbackPending({
        feedback,
      }),
    );
    this.feedbackForm.reset();
  }

  public close!: () => void;
  public save!: (value: object) => void;
  public getField(name: string) {
    return this.feedbackForm.get(name);
  }
}
