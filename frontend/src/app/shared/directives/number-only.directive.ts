import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { KeyEnum } from '@shared/enums/keys.enum';

const PERMISSION_KEY_DOWN = [
  KeyEnum.Backspace,
  KeyEnum.Delete,
  KeyEnum.ArrowUp,
  KeyEnum.ArrowRight,
  KeyEnum.ArrowDown,
  KeyEnum.ArrowLeft,
  KeyEnum.Numpad0,
  KeyEnum.Numpad1,
  KeyEnum.Numpad2,
  KeyEnum.Numpad3,
  KeyEnum.Numpad4,
  KeyEnum.Numpad5,
  KeyEnum.Numpad6,
  KeyEnum.Numpad7,
  KeyEnum.Numpad8,
  KeyEnum.Numpad9,

  KeyEnum.Digit0,
  KeyEnum.Digit1,
  KeyEnum.Digit2,
  KeyEnum.Digit3,
  KeyEnum.Digit4,
  KeyEnum.Digit5,
  KeyEnum.Digit6,
  KeyEnum.Digit7,
  KeyEnum.Digit8,
  KeyEnum.Digit9,
  KeyEnum.Tab,
].map((k) => k.toString());

@Directive({
  selector: '[oaiNumberOnly]',
  standalone: true,
})
export class NumberOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeydowm(event: KeyboardEvent): void {
    console.log(event.key);
    if (!event.metaKey && !PERMISSION_KEY_DOWN.includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  @HostListener('input', ['$event'])
  onInputEvent(event: InputEvent): void { 
    const input = (event.target as HTMLInputElement);
    const inputValue = input.value;
    input.value = inputValue.replaceAll(/[^0-9]+/gm, '');
  }

}
