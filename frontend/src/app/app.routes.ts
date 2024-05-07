import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@core/container/container.routes').then((r) => r.routes),
  },
];
