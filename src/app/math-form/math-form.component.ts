import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { MathvalueValidators } from '../common/validators/mathvalue.validators';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'math-form',
  templateUrl: './math-form.component.html',
  styleUrls: ['./math-form.component.css'],
})
export class MathFormComponent implements OnInit {
  private calculatePause = new Subject<any>();
  resultValue: any = '';
  form = new FormGroup(
    {
      firstValue: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      secondValue: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        MathvalueValidators.cannotContainsZero,
      ]),
    },
    { updateOn: 'change' }
  );

  get firstValue() {
    return this.form.get('firstValue');
  }
  get secondValue() {
    return this.form.get('secondValue');
  }

  calculateResult(event: any) {
    const value = event.target.value;
    this.calculatePause.next(value);
  }

  ngOnInit(): void {
    this.calculatePause.pipe(debounceTime(500)).subscribe((d) => {
      console.log(d);
      this.resultValue = '';
      if (this.firstValue?.valid && this.secondValue?.valid) {
        this.resultValue = (
          this.firstValue?.value / this.secondValue?.value
        ).toFixed(2);
      }
    });
  }
}
