import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { IFeedback } from '../../../store/reducers/product.reducer';

@Component({
  selector: 'ngx-shop-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.sass'],
})
export class AddFeedbackComponent {

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });


  constructor(
    private fb: FormBuilder,
  ) {
  }

  public async addFeedback(value: IFeedback): Promise<void> {
    const feedback = {
      rate: value.rate,
      advantages: value.advantages,
    };
    this.feedbackForm.reset();
    this.save(feedback);
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