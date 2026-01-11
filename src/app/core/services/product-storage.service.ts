import { Injectable } from '@angular/core';
import { Product } from '../models/user.model';
import { MOCK_USERS } from '../data/mock-users';

/**
 * ProductStorageService
 * Manages products in localStorage as the single source of truth
 * Handles migration from MOCK_USERS to global products array
 */
@Injectable({
  providedIn: 'root'
})
export class ProductStorageService {
  private readonly STORAGE_KEY = 'products';
  private readonly MIGRATION_FLAG_KEY = 'products_migrated';

  constructor() {
    this.ensureMigration();
  }

  /**
   * Migrate mock user products to global products array (runs once)
   */
  private ensureMigration(): void {
    // Check if migration already completed
    if (localStorage.getItem(this.MIGRATION_FLAG_KEY)) {
      return;
    }

    // Check if products already exist (manual creation before migration)
    const existingProducts = this.getAllProducts();
    if (existingProducts.length > 0) {
      // Mark as migrated to prevent future migrations
      localStorage.setItem(this.MIGRATION_FLAG_KEY, 'true');
      return;
    }

    // Migrate all products from MOCK_USERS
    const migratedProducts: Product[] = [];

    MOCK_USERS.forEach(user => {
      user.products.forEach(product => {
        // Create Product object with sellerMobileNumber
        const migratedProduct: Product = {
          productId: product.productId,
          sellerMobileNumber: user.mobileNumber,
          name: product.name,
          imageUrl: product.imageUrl,
          unit: product.unit,
          pricePerUnit: product.pricePerUnit,
          initialStock: product.initialStock || product.currentStock,
          currentStock: product.currentStock,
          unitsSold: product.unitsSold || 0,
          createdDate: product.createdDate
        };

        migratedProducts.push(migratedProduct);
      });
    });

    // Save migrated products to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(migratedProducts));
    localStorage.setItem(this.MIGRATION_FLAG_KEY, 'true');

    console.log(`✅ Migrated ${migratedProducts.length} products from MOCK_USERS to localStorage`);
  }

  /**
   * Get all products from localStorage
   */
  getAllProducts(): Product[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get products from localStorage:', error);
      return [];
    }
  }

  /**
   * Get products for a specific seller
   */
  getProductsBySeller(sellerMobileNumber: string): Product[] {
    const allProducts = this.getAllProducts();
    return allProducts.filter(p => p.sellerMobileNumber === sellerMobileNumber);
  }

  /**
   * Get a product by ID
   */
  getProductById(productId: string): Product | null {
    const allProducts = this.getAllProducts();
    return allProducts.find(p => p.productId === productId) || null;
  }

  /**
   * Add a new product to localStorage
   */
  addProduct(product: Product): boolean {
    try {
      const products = this.getAllProducts();
      
      // Generate unique ID if not provided
      if (!product.productId) {
        product.productId = this.generateProductId();
      }

      // Set defaults
      if (!product.createdDate) {
        product.createdDate = new Date().toISOString().split('T')[0];
      }
      if (product.unitsSold === undefined) {
        product.unitsSold = 0;
      }
      if (!product.initialStock) {
        product.initialStock = product.currentStock;
      }

      // Add product
      products.push(product);

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));

      console.log('✅ Product added successfully:', product.name);
      return true;
    } catch (error) {
      console.error('Failed to add product:', error);
      return false;
    }
  }

  /**
   * Update an existing product
   */
  updateProduct(productId: string, updates: Partial<Product>): boolean {
    try {
      const products = this.getAllProducts();
      const index = products.findIndex(p => p.productId === productId);

      if (index === -1) {
        console.error('Product not found:', productId);
        return false;
      }

      // Update product (preserve productId and sellerMobileNumber)
      products[index] = {
        ...products[index],
        ...updates,
        productId: products[index].productId,
        sellerMobileNumber: products[index].sellerMobileNumber
      };

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));

      console.log('✅ Product updated successfully:', productId);
      return true;
    } catch (error) {
      console.error('Failed to update product:', error);
      return false;
    }
  }

  /**
   * Delete a product
   */
  deleteProduct(productId: string): boolean {
    try {
      const products = this.getAllProducts();
      const filteredProducts = products.filter(p => p.productId !== productId);

      if (products.length === filteredProducts.length) {
        console.error('Product not found:', productId);
        return false;
      }

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProducts));

      console.log('✅ Product deleted successfully:', productId);
      return true;
    } catch (error) {
      console.error('Failed to delete product:', error);
      return false;
    }
  }

  /**
   * Generate a unique product ID
   */
  private generateProductId(): string {
    return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculate seller statistics
   */
  getSellerStats(sellerMobileNumber: string): {
    totalProducts: number;
    totalUnitsSold: number;
    totalRevenue: number;
  } {
    const products = this.getProductsBySeller(sellerMobileNumber);

    const totalProducts = products.length;
    const totalUnitsSold = products.reduce((sum, p) => sum + (p.unitsSold || 0), 0);
    const totalRevenue = products.reduce((sum, p) => {
      const unitsSold = p.unitsSold || 0;
      return sum + (unitsSold * p.pricePerUnit);
    }, 0);

    return { totalProducts, totalUnitsSold, totalRevenue };
  }
}
