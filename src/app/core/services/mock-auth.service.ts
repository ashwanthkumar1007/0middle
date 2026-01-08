import { Injectable } from '@angular/core';

/**
 * Mock authentication service for static OTP flow
 * This simulates backend OTP generation and verification
 * Replace with real API calls when backend is ready
 */
@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private currentOtp: string | null = null;
  private readonly OTP_LENGTH = 6;
  private readonly OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
  private otpGeneratedAt: number | null = null;

  /**
   * Generate a mock OTP
   * Returns the OTP for display purposes (simulating SMS)
   */
  generateOtp(): string {
    // Generate random 6-digit OTP
    this.currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpGeneratedAt = Date.now();
    
    // Log OTP to console (simulating SMS notification)
    console.log('📱 Mock OTP Generated:', this.currentOtp);
    console.log('⏰ Valid for 5 minutes');
    
    return this.currentOtp;
  }

  /**
   * Get the current OTP (for auto-fill simulation)
   */
  getCurrentOtp(): string | null {
    if (!this.currentOtp || !this.otpGeneratedAt) {
      return null;
    }

    // Check if OTP has expired
    const isExpired = Date.now() - this.otpGeneratedAt > this.OTP_EXPIRY_MS;
    if (isExpired) {
      this.clearOtp();
      return null;
    }

    return this.currentOtp;
  }

  /**
   * Verify entered OTP against generated OTP
   */
  verifyOtp(enteredOtp: string): boolean {
    if (!this.currentOtp || !enteredOtp) {
      return false;
    }

    // Check if OTP has expired
    if (this.otpGeneratedAt) {
      const isExpired = Date.now() - this.otpGeneratedAt > this.OTP_EXPIRY_MS;
      if (isExpired) {
        this.clearOtp();
        return false;
      }
    }

    // Verify OTP match
    const isValid = enteredOtp === this.currentOtp;
    
    if (isValid) {
      // Clear OTP after successful verification
      this.clearOtp();
    }

    return isValid;
  }

  /**
   * Clear current OTP
   */
  clearOtp(): void {
    this.currentOtp = null;
    this.otpGeneratedAt = null;
  }

  /**
   * Simulate sending OTP (with async delay)
   * Returns a promise that resolves with the OTP
   */
  async sendOtp(mobileNumber: string): Promise<string> {
    // Simulate network delay
    await this.delay(1000);
    
    // Validate mobile number format (basic check)
    if (!/^\d{10}$/.test(mobileNumber)) {
      throw new Error('Invalid mobile number format');
    }

    // Generate and return OTP
    return this.generateOtp();
  }

  /**
   * Simulate OTP verification with async delay
   */
  async verifyOtpAsync(enteredOtp: string): Promise<boolean> {
    // Simulate network delay
    await this.delay(800);
    
    return this.verifyOtp(enteredOtp);
  }

  /**
   * Helper method to simulate async delays
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get remaining time for OTP validity (in seconds)
   */
  getRemainingTime(): number {
    if (!this.otpGeneratedAt) {
      return 0;
    }

    const elapsed = Date.now() - this.otpGeneratedAt;
    const remaining = Math.max(0, this.OTP_EXPIRY_MS - elapsed);
    return Math.floor(remaining / 1000);
  }
}
