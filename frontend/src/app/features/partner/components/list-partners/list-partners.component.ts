import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type PartnerListModel = {
  name: string;
  governmentId: string;
  country: string;
};

const MOCK: PartnerListModel[] = [
  {
    name: 'Teste Teste',
    governmentId: '904283409283',
    country: 'br',
  },
];

@Component({
  selector: 'app-list-partners',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-partners.component.html',
  styleUrl: './list-partners.component.scss',
})
export class ListPartnersComponent {
  partners = signal<any[]>(MOCK);
}
