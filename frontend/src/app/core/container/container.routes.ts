import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@core/container/container.component').then(
        (c) => c.ContainerComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@core/template/template.routes').then((r) => r.routes),
      },
    ],
  },
];
