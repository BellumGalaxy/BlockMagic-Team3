import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@shared/form-field/form-field.component';
import { InputComponent } from '@shared/inputs/input/input.component';
import { SelectComponent } from '@shared/selects/select/select.component';

// datas json
import * as countries from '../../../../../data/countries.json';
import * as flags from '../../../../../data/world-countries/flags/16x16/flags-16x16.json';
import { RouterLink } from '@angular/router';

type CountryCodeName = {
  code: string;
  name: string;
  flag: string;
};

@Component({
  selector: 'app-form-partner',
  standalone: true,
  imports: [
    InputComponent,
    FormFieldComponent,
    SelectComponent,
    RouterLink,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './form-partner.component.html',
  styleUrl: './form-partner.component.scss',
})
export class FormPartnerComponent {
  countries = signal<CountryCodeName[]>([]);

  img = new FormControl<string | null>(null);

  constructor() {
    this.countries.update(() =>
      Object.keys(countries)
        .slice(30)
        .map((key) => {
          return {
            code: key,
            name: (countries as unknown as any)[key],
            flag: (flags as unknown as any)[key.toLowerCase()],
          };
        })
    );
  }
}
