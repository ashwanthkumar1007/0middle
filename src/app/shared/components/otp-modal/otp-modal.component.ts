import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockAuthService } from '../../../core/services/mock-auth.service';

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss']
})
export class OtpModalComponent implements OnInit, OnDestroy {
  @Output() otpVerified = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  otpForm!: FormGroup;
  isVerifying = false;
  errorMessage = '';
  remainingTime = 0;
  private countdownInterval?: number;

  constructor(
    private fb: FormBuilder,
    private mockAuthService: MockAuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.startCountdown();
    this.simulateAutofill();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  /**
   * Initialize OTP form
   */
  private initForm(): void {
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });
  }

  /**
   * Simulate OS autofill behavior
   */
  private simulateAutofill(): void {
    const currentOtp = this.mockAuthService.getCurrentOtp();
    if (currentOtp && currentOtp.length === 6) {
      // Auto-fill after a short delay (simulating OS autofill)
      setTimeout(() => {
        this.fillOtp(currentOtp);
      }, 500);
    }
  }

  /**
   * Fill OTP inputs with provided value
   */
  private fillOtp(otp: string): void {
    if (otp.length === 6) {
      for (let i = 0; i < 6; i++) {
        this.otpForm.get(`digit${i + 1}`)?.setValue(otp[i]);
      }
    }
  }

  /**
   * Handle input in OTP fields with auto-advance
   */
  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow single digit
    if (value.length > 1) {
      input.value = value[0];
      this.otpForm.get(`digit${index}`)?.setValue(value[0]);
    }

    // Auto-advance to next input
    if (value && index < 6) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }

    // Clear error when user types
    this.errorMessage = '';
  }

  /**
   * Handle backspace to move to previous input
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      
      if (!input.value && index > 1) {
        event.preventDefault();
        const prevInput = document.getElementById(`otp-digit-${index - 1}`) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  }

  /**
   * Handle paste event to fill all inputs
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    
    if (pastedData && /^\d{6}$/.test(pastedData)) {
      this.fillOtp(pastedData);
      // Focus last input
      const lastInput = document.getElementById('otp-digit-6') as HTMLInputElement;
      lastInput?.focus();
    }
  }

  /**
   * Get concatenated OTP value
   */
  private getOtpValue(): string {
    return Object.keys(this.otpForm.value)
      .sort()
      .map(key => this.otpForm.value[key])
      .join('');
  }

  /**
   * Verify OTP
   */
  async onVerifyOtp(): Promise<void> {
    if (this.otpForm.invalid || this.isVerifying) {
      return;
    }

    this.isVerifying = true;
    this.errorMessage = '';

    const enteredOtp = this.getOtpValue();

    try {
      const isValid = await this.mockAuthService.verifyOtpAsync(enteredOtp);

      if (isValid) {
        this.otpVerified.emit();
      } else {
        this.errorMessage = 'Invalid OTP. Please try again.';
        this.otpForm.reset();
        // Focus first input
        setTimeout(() => {
          const firstInput = document.getElementById('otp-digit-1') as HTMLInputElement;
          firstInput?.focus();
        }, 100);
      }
    } catch (error) {
      this.errorMessage = 'Verification failed. Please try again.';
    } finally {
      this.isVerifying = false;
    }
  }

  /**
   * Start countdown timer
   */
  private startCountdown(): void {
    this.remainingTime = this.mockAuthService.getRemainingTime();
    
    this.countdownInterval = window.setInterval(() => {
      this.remainingTime = this.mockAuthService.getRemainingTime();
      
      if (this.remainingTime <= 0) {
        this.errorMessage = 'OTP expired. Please request a new one.';
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
      }
    }, 1000);
  }

  /**
   * Format remaining time as MM:SS
   */
  get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Close modal
   */
  onClose(): void {
    this.closeModal.emit();
  }
}
