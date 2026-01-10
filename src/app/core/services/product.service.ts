import { Injectable } from '@angular/core';
import { Product, User } from '../models/user.model';
import { UserService } from './user.service';

/**
 * Product service for managing product CRUD operations
 * All operations are static and use localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private userService: UserService) {}

  /**
   * Get all products for a specific user
   */
  getUserProducts(userId: string): Product[] {
    const user = this.userService.getUserById(userId);
    return user?.products || [];
  }

  /**
   * Get a specific product by ID for a user
   */
  getProductById(userId: string, productId: string): Product | null {
    const products = this.getUserProducts(userId);
    return products.find(p => p.productId === productId) || null;
  }

  /**
   * Add a new product for a user
   */
  addProduct(userId: string, product: Product): boolean {
    try {
      const user = this.userService.getUserById(userId);
      
      if (!user) {
        return false;
      }

      // Generate unique product ID if not provided
      if (!product.productId) {
        product.productId = this.generateProductId();
      }

      // Set created date if not provided
      if (!product.createdDate) {
        product.createdDate = new Date().toISOString().split('T')[0];
      }

      // Add product to user's products array
      user.products.push(product);

      // Save updated user
      const success = this.userService.updateUser(user);

      if (success) {
        // Recalculate user stats
        this.userService.updateUserStats(userId);
      }

      return success;
    } catch (error) {
      console.error('Failed to add product:', error);
      return false;
    }
  }

  /**
   * Update an existing product
   */
  updateProduct(userId: string, productId: string, updatedProduct: Partial<Product>): boolean {
    try {
      const user = this.userService.getUserById(userId);
      
      if (!user) {
        return false;
      }

      const productIndex = user.products.findIndex(p => p.productId === productId);

      if (productIndex === -1) {
        return false;
      }

      // Update product fields
      user.products[productIndex] = {
        ...user.products[productIndex],
        ...updatedProduct,
        productId // Ensure ID doesn't change
      };

      // Save updated user
      const success = this.userService.updateUser(user);

      if (success) {
        // Recalculate user stats
        this.userService.updateUserStats(userId);
      }

      return success;
    } catch (error) {
      console.error('Failed to update product:', error);
      return false;
    }
  }

  /**
   * Delete a product
   */
  deleteProduct(userId: string, productId: string): boolean {
    try {
      const user = this.userService.getUserById(userId);
      
      if (!user) {
        return false;
      }

      const productIndex = user.products.findIndex(p => p.productId === productId);

      if (productIndex === -1) {
        return false;
      }

      // Remove product from array
      user.products.splice(productIndex, 1);

      // Save updated user
      const success = this.userService.updateUser(user);

      if (success) {
        // Recalculate user stats
        this.userService.updateUserStats(userId);
      }

      return success;
    } catch (error) {
      console.error('Failed to delete product:', error);
      return false;
    }
  }

  /**
   * Calculate total revenue for a product
   */
  calculateProductRevenue(product: Product): number {
    return product.pricePerUnit * product.unitsSold;
  }

  /**
   * Check if product is sold out
   */
  isProductSoldOut(product: Product): boolean {
    return product.currentStock === 0;
  }

  /**
   * Generate a unique product ID
   */
  private generateProductId(): string {
    return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Format product quantity display
   */
  formatQuantity(product: Product): string {
    return `${product.currentStock} ${product.unit}`;
  }

  /**
   * Format product price display
   */
  formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
  }
}
