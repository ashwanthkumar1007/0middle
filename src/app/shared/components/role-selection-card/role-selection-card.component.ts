import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface RoleCardConfig {
  title: string;
  subtitle: string;
  icon: string;
  themeColor: 'green' | 'blue';
  route: string;
}

@Component({
  selector: 'app-role-selection-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-selection-card.component.html',
  styleUrls: ['./role-selection-card.component.scss']
})
export class RoleSelectionCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() icon!: string;
  @Input() themeColor: 'green' | 'blue' = 'green';
  @Input() route!: string;

  constructor(private router: Router) {}

  /**
   * Navigate to the specified route
   */
  handleCardClick(): void {
    if (this.route) {
      // Check if route contains query parameters
      const [path, queryString] = this.route.split('?');
      
      if (queryString) {
        // Parse query parameters
        const queryParams: { [key: string]: string } = {};
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=');
          queryParams[key] = value;
        });
        
        this.router.navigate([path], { queryParams });
      } else {
        this.router.navigate([this.route]);
      }
    }
  }

  /**
   * Handle keyboard navigation (Enter and Space)
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCardClick();
    }
  }
}
