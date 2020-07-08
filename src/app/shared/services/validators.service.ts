import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';

@Injectable()
// @ts-ignore
export class ValidatorsService {
  public telephoneValidator(control: FormGroup): ValidationErrors | null {
    const { telephone } = control.value;
    return telephone &&
      telephone.substring(0, 3) === '+44' &&
      telephone.length >= 10
      ? null
      : { isNotMatch: true };
  }
}
