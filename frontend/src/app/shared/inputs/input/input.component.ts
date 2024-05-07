import { JsonPipe } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { CurrencyDirective } from '@shared/directives/currency-directive.directive';
// import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { tap } from 'rxjs';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'mobilephone'
  | 'time'
  | 'date'
  | 'money';

export type VoidFunc = <T>(value: T) => void;

type AutoCompleteType = 'off' | 'on';

@Component({
  selector: 'ot-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    // NgxMaskDirective,
    CurrencyDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    // provideNgxMask(),
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() type: InputType = 'text';
  @Input() label: string | null = null;
  @Input() placeholder: string = '';
  @Input() autocomplete: AutoCompleteType = 'off';

  protected control = new FormControl('');

  private _onChange: VoidFunc = () => {};
  private _onTouched: VoidFunc = () => {};
  private _onChangeUpdate: VoidFunc = (value) => {
    this._onChange(value);
  };

  protected disabled: boolean = false;
  protected _mask: string | null = '';

  constructor() {
    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((value) => this._onChangeUpdate(value))
      )
      .subscribe();
  }

  validate(control: FormControl): ValidationErrors | null {
    if (!!control && !!control.validator) {
      this.control = control;
      return control.validator!(new FormControl(this.control.value));
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {}

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

  get mask(): string | null {
    if (this.type === 'mobilephone') {
      this._mask = '(00) 00000-0000';
    } else if (this.type === 'money') {
      this._mask = '0000009,00';
    }

    return this._mask;
  }

  set mask(value: string | null) {
    this._mask = value;
  }

  get value(): string | null {
    return this.control.value;
  }
}
