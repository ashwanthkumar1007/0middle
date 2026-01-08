import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectionCardComponent, RoleCardConfig } from '../../shared/components/role-selection-card/role-selection-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RoleSelectionCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * Configuration for the role selection cards
   */
  readonly roleCards: RoleCardConfig[] = [
    {
      title: 'Farmer / Seller',
      subtitle: 'I want to sell my staples',
      icon: '🌾',
      themeColor: 'green',
      route: '/auth/mobile?role=farmer'
    },
    {
      title: 'Consumer / Buyer',
      subtitle: 'I want to buy staples',
      icon: '🛒',
      themeColor: 'blue',
      route: '/auth/mobile?role=consumer'
    }
  ];
}
