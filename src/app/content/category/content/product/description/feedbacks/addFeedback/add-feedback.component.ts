import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { IFeedback } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'ngx-shop-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFeedbackComponent {
  public feedbackForm: FormGroup = this._fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });

  constructor(private readonly _fb: FormBuilder) {}
  public close!: () => void;
  public save!: (value: object) => void;
  public getField(name: string): AbstractControl | null {
    return this.feedbackForm.get(name);
  }
  public async addFeedback(value: IFeedback): Promise<void> {
    const feedback = {
      rate: value.rate,
      advantages: value.advantages,
    };
    this.feedbackForm.reset();
    this.save(feedback);
  }
}
@NgModule({
  declarations: [AddFeedbackComponent, RatingComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddFeedbackModule {}
