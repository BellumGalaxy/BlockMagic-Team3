import { Directive, ElementRef, HostListener, inject } from '@angular/core';
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
@Directive({ selector: '[oaiCurrency]', standalone: true })
export class CurrencyDirective {
  #elRef = inject(ElementRef<HTMLInputElement>);

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeydowm(event: KeyboardEvent): void {
    if (!event.metaKey && !PERMISSION_KEY_DOWN.includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  @HostListener('input', ['$event'])
  onInputEvent(event: InputEvent): void {
    const inputValue = (this.#elRef.nativeElement.value as string)
      .toString()
      .replace(',', '')
      .replaceAll(new RegExp(/[R\$,\. ]+/g), '');
    const numbers = new RegExp(/\d+/g).exec(inputValue)?.join('');
    const value = numbers?.toString()?.trim().padStart(3, '0');

    if (!!value) {
      const thousand = Number(
        value.slice(0, value.length - 2)?.toString() ?? '0'
      ).toString().length;

      let i = 0;
      let max = Math.ceil(Number(thousand / 3)) - 1;
      const arr = [];
      const text = value.slice(0, value.length - 2)?.toString();
      const textArrReverse = Array.from(text).reverse();
      const results = [];
      while (i <= max) {
        results.push([...textArrReverse].slice(i * 3, i * 3 + 3));
        i++;
      }

      const v = results
        .map((arr, index) => {
          const t = arr.reverse().join('');

          if (results.length - 1 === index) {
            return Number(t).toString();
          }

          return t;
        })
        .reverse()
        .join('.');

      const result = v + ',' + value.slice(value.length - 2, value.length);
      this.#elRef.nativeElement.value = 'R$ ' + result;
    } else {
      this.#elRef.nativeElement.value = 'R$ 0,00';
    }
  }
}
