import { AfterViewInit, Component, ViewChild, input } from '@angular/core';
import { OaiInputDirective } from '@shared/directives/oai-input.directive';

@Component({
  selector: 'ot-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements AfterViewInit {
  label = input('');

  @ViewChild(OaiInputDirective)
  inputDirective?: OaiInputDirective;

  constructor() {}

  ngAfterViewInit(): void {}
}
