import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { initializeMockData } from '../data/mock-users';

/**
 * User service for managing user data
 * Handles user retrieval and updates via localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERS_DB_KEY = 'omiddle_users_db';

  constructor() {
    // Initialize mock data on service creation
    initializeMockData();
  }

  /**
   * Get all users from localStorage
   */
  private getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(this.USERS_DB_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  /**
   * Save all users to localStorage
   */
  private saveAllUsers(users: User[]): void {
    try {
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  /**
   * Get user by mobile number
   */
  getUserByMobile(mobileNumber: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.mobileNumber === mobileNumber) || null;
  }

  /**
   * Get user by ID
   */
  getUserById(userId: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.id === userId) || null;
  }

  /**
   * Update user data
   */
  updateUser(updatedUser: User): boolean {
    try {
      const users = this.getAllUsers();
      const index = users.findIndex(user => user.id === updatedUser.id);
      
      if (index !== -1) {
        users[index] = updatedUser;
        this.saveAllUsers(users);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to update user:', error);
      return false;
    }
  }

  /**
   * Calculate total products sold for a user
   */
  calculateTotalProductsSold(user: User): number {
    return user.products.reduce((total, product) => total + product.unitsSold, 0);
  }

  /**
   * Calculate total sales amount for a user
   */
  calculateTotalSalesAmount(user: User): number {
    return user.products.reduce((total, product) => {
      return total + (product.pricePerUnit * product.unitsSold);
    }, 0);
  }

  /**
   * Update user stats (recalculate from products)
   */
  updateUserStats(userId: string): boolean {
    const user = this.getUserById(userId);
    
    if (!user) {
      return false;
    }

    user.totalProductsSold = this.calculateTotalProductsSold(user);
    user.totalSalesAmount = this.calculateTotalSalesAmount(user);

    return this.updateUser(user);
  }
}
