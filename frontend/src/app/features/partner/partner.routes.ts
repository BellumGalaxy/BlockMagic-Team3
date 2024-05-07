import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/partner/partner.component').then(
        (c) => c.PartnerComponent
      ),
    children: [
      {
        path: '',
        title: 'Partners',
        loadComponent: () =>
          import(
            '@features/partner/components/list-partners/list-partners.component'
          ).then((c) => c.ListPartnersComponent),
      },
      {
        path: 'new',
        title: 'New Partner',
        loadComponent: () =>
          import(
            '@features/partner/components/form-partner/form-partner.component'
          ).then((c) => c.FormPartnerComponent),
      },
    ],
  },
];
