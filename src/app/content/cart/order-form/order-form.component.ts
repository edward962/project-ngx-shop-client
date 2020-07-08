import { ValidatorsService } from './../../../shared/services/validators.service';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-shop-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  @Output()
  public confirm: EventEmitter<FormData> = new EventEmitter<FormData>();

  public form: FormGroup = this._fb.group(
    {
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.required]],
    },
    {
      validator: this.validatorsService.telephoneValidator,
    }
  );

  constructor(
    private readonly _fb: FormBuilder,
    private readonly validatorsService: ValidatorsService
  ) {}
  public submit(): void {
    this.confirm.emit();
    this.form.reset();
  }
}
