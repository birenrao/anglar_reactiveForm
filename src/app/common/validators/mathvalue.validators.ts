import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MathvalueValidators {
  static cannotContainsZero(control: AbstractControl): ValidationErrors | null {
    if (control.value.length > 0 && control.value == 0)
      return { cannotContainsZero: true };

    return null;
  }
}
