import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@core/template/template.component').then(
        (c) => c.TemplateComponent
      ),
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('@features/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'partners',
        title: 'Partners',
        loadChildren: () =>
          import('@features/partner/partner.routes').then((r) => r.routes),
      },
    ],
  },
];
