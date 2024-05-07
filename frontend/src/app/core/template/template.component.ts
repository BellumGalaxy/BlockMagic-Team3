import { Component, WritableSignal, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  router = inject(Router);
  title: WritableSignal<string> = signal('Home');
}
