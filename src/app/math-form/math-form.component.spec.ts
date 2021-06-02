import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MathFormComponent } from './math-form.component';

describe('MathFormComponent', () => {
  let component: MathFormComponent;
  let fixture: ComponentFixture<MathFormComponent>;
  let firstValueEle: AbstractControl;
  let secondValueEle: AbstractControl;
  let resultValueEle: DebugElement;
  let errMsg: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MathFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    firstValueEle = component.form.controls['firstValue'];
    secondValueEle = component.form.controls['secondValue'];
    resultValueEle = fixture.debugElement.query(By.css('#resultValue'));
  });

  it('should create math component', () => {
    expect(component).toBeTruthy();
  });

  it('should exist firstValue input component as empty', () => {
    firstValueEle = component.form.controls['firstValue'];
    expect(firstValueEle.value).toBe('');
    expect(firstValueEle.valid).toBeFalsy();
  });

  it('should exist secondValue input component as empty', () => {
    secondValueEle = component.form.controls['secondValue'];
    expect(secondValueEle.value).toBe('');
    expect(secondValueEle.valid).toBeFalsy();
  });

  it('should check firstValue input with required validation and with valid value', () => {
    firstValueEle = component.form.controls['firstValue'];
    expect(firstValueEle.valid).toBeFalsy();
    expect(firstValueEle.pristine).toBeTruthy();
    expect(firstValueEle.errors?.required).toBeTruthy();
    firstValueEle.setValue('20');
    expect(firstValueEle.errors).toBeNull();
  });

  it('should check secondValue input with required validation and with valid value', () => {
    secondValueEle = component.form.controls['secondValue'];
    expect(secondValueEle.valid).toBeFalsy();
    expect(secondValueEle.pristine).toBeTruthy();
    secondValueEle.touched.valueOf();
    expect(secondValueEle.errors?.required).toBeTruthy();
    secondValueEle.setValue('20');
    expect(secondValueEle.errors).toBeNull();
  });

  it('If first and second value update show result value provided with valid input', () => {
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    firstValueEle.setValue('20');
    let input = fixture.debugElement.query(By.css('#firstValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    secondValueEle.touched.valueOf();
    secondValueEle.setValue('10');
    input = fixture.debugElement.query(By.css('#secondValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    expect(resultValueEle.nativeElement.innerHTML).toBe('Result: 2.00');
  });

  it('If first and second value update with invalid input show error', () => {
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    firstValueEle.setValue('hg');
    let input = fixture.debugElement.query(By.css('#firstValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    secondValueEle.touched.valueOf();
    secondValueEle.setValue('qx');
    input = fixture.debugElement.query(By.css('#secondValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();

    expect(firstValueEle.hasError('pattern')).toEqual(true);
    expect(secondValueEle.hasError('pattern')).toEqual(true);
  });

  it('If first and second value update with invalid and valud respective input, then show only related error', () => {
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    firstValueEle.setValue('hg');
    let input = fixture.debugElement.query(By.css('#firstValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    secondValueEle.touched.valueOf();
    secondValueEle.setValue('10');
    input = fixture.debugElement.query(By.css('#secondValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();

    expect(firstValueEle.hasError('pattern')).toEqual(true);
    expect(secondValueEle.hasError('pattern')).toEqual(false);
  });

  it('if divisor with valid value then show result', () => {
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    firstValueEle.setValue('20');
    let input = fixture.debugElement.query(By.css('#firstValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    secondValueEle.setValue('10');
    input = fixture.debugElement.query(By.css('#secondValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    expect(resultValueEle.nativeElement.innerHTML).toBe('Result: 2.00');
  });

  it('if divisor with 0 value then show error', () => {
    firstValueEle.touched.valueOf();
    fixture.detectChanges();
    firstValueEle.setValue('20');
    let input = fixture.debugElement.query(By.css('#firstValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    secondValueEle.setValue('0');
    input = fixture.debugElement.query(By.css('#secondValue'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));

    expect(component.form.valid).toBeFalsy();
    expect(secondValueEle.hasError('cannotContainsZero')).toEqual(true);
  });
});
