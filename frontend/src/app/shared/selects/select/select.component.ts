import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

type VoidFunc = <T>(value: T) => void;

@Component({
  selector: 'ot-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, Validator {
  label = input<string>();

  protected control = new FormControl();
  protected disabled: boolean = false;
  private _onChange: VoidFunc = () => {};
  private _onTouched: VoidFunc = () => {};

  validate(control: FormControl): ValidationErrors | null {
    if (!!control && !!control.validator) {
      this.control = control;
      return control.validator!(new FormControl(this.control.value));
    }
    return null;
  }

  writeValue(obj: any): void {
    // this.control.setValue(obj);
    this._onChange(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control?.enable();
    }
  }

  markOnTouched(): void {
    !this.disabled && !!this._onTouched && this._onTouched(this.control.value);
  }
}
