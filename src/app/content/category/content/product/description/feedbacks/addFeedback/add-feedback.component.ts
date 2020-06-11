import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/store/reducers';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/content/category/store/reducers/products.reducer';
import { IFeedback } from '../../../store/reducers/product.reducer';
import { getProductPending, createFeedbackPending } from '../../../store/actions/product.actions';

@Component({
  selector: 'ngx-shop-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.sass'],
})
export class AddFeedbackComponent  implements OnInit{

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });


  public query: any;
  public product$?: Observable<any> = this.store.select('product', 'item');
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
    this.close();
  }
  public close!: () => void;
  public save!: (value: object) => void;
  public getField(name: string) {
    return this.feedbackForm.get(name);
  }
}
@NgModule({
  declarations: [AddFeedbackComponent,RatingComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
// @ts-ignore
class AddFeedbackModule {}