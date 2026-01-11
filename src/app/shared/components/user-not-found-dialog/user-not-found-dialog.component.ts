import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable dialog component for showing user not found message
 * Supports both seller and buyer validation (buyer validation is future)
 */
@Component({
  selector: 'app-user-not-found-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-not-found-dialog.component.html',
  styleUrls: ['./user-not-found-dialog.component.scss']
})
export class UserNotFoundDialogComponent {
  @Input() mobileNumber: string = '';
  @Input() userType: 'seller' | 'buyer' = 'seller'; // Future-proof for buyers
  @Output() createAccount = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
  
  isOpen = false;
  
  /**
   * Open the dialog
   */
  open(): void {
    this.isOpen = true;
  }
  
  /**
   * Close the dialog
   */
  close(): void {
    this.isOpen = false;
  }
  
  /**
   * Handle create account button click
   */
  onCreateAccount(): void {
    this.createAccount.emit();
  }
  
  /**
   * Handle go back button click
   */
  onGoBack(): void {
    this.goBack.emit();
  }
  
  /**
   * Prevent closing when clicking modal content
   */
  onModalClick(event: Event): void {
    event.stopPropagation();
  }
  
  /**
   * Get user type label for display
   */
  get userTypeLabel(): string {
    return this.userType === 'seller' ? 'Seller' : 'Buyer';
  }
  
  /**
   * Format mobile number with dashes (XXXX-XXX-XXX)
   */
  get maskedMobileNumber(): string {
    if (this.mobileNumber.length === 10) {
      return `${this.mobileNumber.slice(0, 4)}-${this.mobileNumber.slice(4, 7)}-${this.mobileNumber.slice(7)}`;
    }
    return this.mobileNumber;
  }
}
