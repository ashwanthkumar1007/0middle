import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() user: User | null = null;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  /**
   * Close sidebar
   */
  onClose(): void {
    this.closeSidebar.emit();
  }

  /**
   * Handle logout
   */
  onLogout(): void {
    this.logout.emit();
  }

  /**
   * Prevent click propagation on sidebar content
   */
  onSidebarClick(event: Event): void {
    event.stopPropagation();
  }
}
