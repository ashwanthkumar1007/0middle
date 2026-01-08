import { Injectable } from '@angular/core';

/**
 * Storage service for handling localStorage operations
 * Provides a clean abstraction layer that can be replaced with backend calls
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly MOBILE_NUMBER_KEY = 'omiddle_mobile_number';
  private readonly USER_ROLE_KEY = 'omiddle_user_role';

  /**
   * Store mobile number in localStorage
   */
  setMobileNumber(mobile: string): void {
    try {
      localStorage.setItem(this.MOBILE_NUMBER_KEY, mobile);
    } catch (error) {
      console.error('Failed to store mobile number:', error);
    }
  }

  /**
   * Retrieve mobile number from localStorage
   */
  getMobileNumber(): string | null {
    try {
      return localStorage.getItem(this.MOBILE_NUMBER_KEY);
    } catch (error) {
      console.error('Failed to retrieve mobile number:', error);
      return null;
    }
  }

  /**
   * Store user role (farmer or consumer)
   */
  setUserRole(role: 'farmer' | 'consumer'): void {
    try {
      localStorage.setItem(this.USER_ROLE_KEY, role);
    } catch (error) {
      console.error('Failed to store user role:', error);
    }
  }

  /**
   * Retrieve user role from localStorage
   */
  getUserRole(): 'farmer' | 'consumer' | null {
    try {
      return localStorage.getItem(this.USER_ROLE_KEY) as 'farmer' | 'consumer' | null;
    } catch (error) {
      console.error('Failed to retrieve user role:', error);
      return null;
    }
  }

  /**
   * Clear all stored authentication data
   */
  clearAuthData(): void {
    try {
      localStorage.removeItem(this.MOBILE_NUMBER_KEY);
      localStorage.removeItem(this.USER_ROLE_KEY);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getMobileNumber() !== null;
  }
}
