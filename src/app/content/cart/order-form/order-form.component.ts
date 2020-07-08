import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'ngx-shop-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  @Output()
  public confirm: EventEmitter<FormData> = new EventEmitter<FormData>();

  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    telephone: ['', [Validators.required, this.phoneValidator]],
    email: ['', [Validators.email, Validators.required]],
    address: ['', [Validators.required]],
  });

  constructor(private readonly _fb: FormBuilder) {}
  public submit(): void {
    this.confirm.emit();
    this.form.reset();
  }
  public phoneValidator(control: FormControl): ValidationErrors | null {
    const phone = control.value;
    return phone && phone.substring(0, 1) === '+' && phone.length >= 13
      ? null
      : { isNotMatch: true };
  }
}
