import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OtpModalComponent } from '../../shared/components/otp-modal/otp-modal.component';
import { MockAuthService } from '../../core/services/mock-auth.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-mobile-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OtpModalComponent],
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.scss']
})
export class MobileNumberComponent implements OnInit {
  mobileForm!: FormGroup;
  userRole: 'farmer' | 'consumer' = 'consumer';
  isLoading = false;
  showOtpModal = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mockAuthService: MockAuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.initForm();
  }

  /**
   * Get user role from route params
   */
  private getUserRole(): void {
    this.route.queryParams.subscribe(params => {
      this.userRole = params['role'] === 'farmer' ? 'farmer' : 'consumer';
      this.storageService.setUserRole(this.userRole);
    });
  }

  /**
   * Initialize mobile number form
   */
  private initForm(): void {
    this.mobileForm = this.fb.group({
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/), // Indian mobile number format
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  /**
   * Format mobile number as user types (add spaces for readability)
   */
  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    this.mobileForm.get('mobileNumber')?.setValue(value, { emitEvent: false });
    this.errorMessage = '';
  }

  /**
   * Get validation error message
   */
  get mobileErrorMessage(): string {
    const control = this.mobileForm.get('mobileNumber');
    
    if (!control?.touched || !control?.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Mobile number is required';
    }

    if (control.errors['pattern'] || control.errors['minlength'] || control.errors['maxlength']) {
      return 'Please enter a valid 10-digit mobile number';
    }

    return '';
  }

  /**
   * Handle Get OTP button click
   */
  async onGetOtp(): Promise<void> {
    if (this.mobileForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const mobileNumber = this.mobileForm.value.mobileNumber;

    try {
      // Simulate sending OTP
      await this.mockAuthService.sendOtp(mobileNumber);
      
      // Show OTP modal
      this.showOtpModal = true;
    } catch (error) {
      this.errorMessage = 'Failed to send OTP. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Handle OTP verification success
   */
  onOtpVerified(): void {
    const mobileNumber = this.mobileForm.value.mobileNumber;
    
    // Store mobile number
    this.storageService.setMobileNumber(mobileNumber);
    
    // Close modal
    this.showOtpModal = false;

    // Navigate based on role
    if (this.userRole === 'farmer') {
      this.router.navigate(['/seller']);
    } else {
      this.router.navigate(['/consumer']);
    }
  }

  /**
   * Handle OTP modal close
   */
  onCloseModal(): void {
    this.showOtpModal = false;
    this.mockAuthService.clearOtp();
  }

  /**
   * Get role-specific content
   */
  get roleIcon(): string {
    return this.userRole === 'farmer' ? '🌾' : '🛒';
  }

  get roleTitle(): string {
    return this.userRole === 'farmer' ? 'Farmer / Seller' : 'Consumer / Buyer';
  }

  get roleColor(): string {
    return this.userRole === 'farmer' ? 'green' : 'blue';
  }
}
