import { Component, Input, OnInit } from '@angular/core';
import { IFeedback, IProduct } from '../../../../../../store/reducers/products.reducer';
import { createFeedbackPending } from '../../../../../../store/actions/products.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../../store/reducers';

@Component({
  selector: 'ngx-shop-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass'],
})
export class FeedbacksComponent {

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });

  @Input() public product!: IProduct;

  constructor(
    private store: Store<IStore>,
    private fb: FormBuilder,
  ) {
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

  public getField(name: string) {
    return this.feedbackForm.get(name);
  }
}
