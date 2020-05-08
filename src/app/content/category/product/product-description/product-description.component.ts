import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFeedback } from 'src/app/store/reducers/products.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { createFeedbackPending } from 'src/app/store/actions/products.actions';

@Component({
  selector: 'ngx-shop-product-description',
  templateUrl: './product-description.component.html',
})
export class ProductDescriptionComponent {
  public isShowDesc = true;
  public isShowFeedback = false;
  public feedbacks: IFeedback[] = [];
  public set feedback(value: IFeedback) {
    if (!value) {
      return;
    }
    this.feedbackForm.patchValue(value);
  }
  // tslint:disable-next-line: no-any
  @Input() public product: any;

  constructor(
    private store: Store<IStore>,
    private fb: FormBuilder
  ) {}

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });

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
  public getField(name: string) {
    return this.feedbackForm.get(name);
  }

}
