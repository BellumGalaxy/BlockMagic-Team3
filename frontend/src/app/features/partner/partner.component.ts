import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss',
})
export class PartnerComponent {}
