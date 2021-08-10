// eslint-disable-next-line max-classes-per-file
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IFeedback } from '@product-store/reducers/product.reducer';
import { TooltipPosition } from '@shared/directives/directive';
import { SharedModule } from '@shared/shared.module';
import { RatingComponent } from '../rating/rating.component';

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

	public position: TooltipPosition = TooltipPosition.LEFT;

	public constructor(private readonly _fb: FormBuilder) {}

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
	imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class AddFeedbackModule {}
