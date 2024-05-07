import { Directive, input } from '@angular/core';
// import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Directive({
  selector: 'input[oaiInput]',
  standalone: true,
  providers: [
    // provideNgxMask()
  ],
})
export class OaiInputDirective {
  teste = input<string>();
}
