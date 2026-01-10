import { Injectable } from '@angular/core';
import { Product, ProductWithStats } from '../models/product.model';
import { StorageService } from './storage.service';

/**
 * ProductService - Manages product operations (NO orders logic here)
 * 
 * RESPONSIBILITIES:
 * - CRUD operations on products
 * - Get products by seller
 * - Update stock (ONLY called by OrderService)
 * 
 * DOES NOT:
 * - Calculate unitsSold (that's OrderService)
 * - Manually modify stock (except via orders)
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PRODUCTS_KEY = 'omiddle_products';

  constructor(private storage: StorageService) {}

  /**
   * Get all products from storage
   */
  getAllProducts(): Product[] {
    return this.storage.getItem<Product[]>(this.PRODUCTS_KEY) || [];
  }

  /**
   * Get products for a specific seller
   */
  getProductsBySeller(sellerMobileNumber: string): Product[] {
    return this.getAllProducts().filter(p => p.sellerMobileNumber === sellerMobileNumber);
  }

  /**
   * Get a specific product by ID
   */
  getProductById(productId: string): Product | null {
    return this.getAllProducts().find(p => p.productId === productId) || null;
  }

  /**
   * Add a new product
   */
  addProduct(product: Omit<Product, 'productId' | 'createdDate'>): Product {
    const newProduct: Product = {
      ...product,
      productId: this.generateProductId(),
      createdDate: new Date().toISOString().split('T')[0],
      currentStock: product.initialStock || product.currentStock // Start with initial stock or currentStock
    };

    const products = this.getAllProducts();
    products.push(newProduct);
    this.storage.setItem(this.PRODUCTS_KEY, products);

    return newProduct;
  }

  /**
   * Update an existing product
   * IMPORTANT: Cannot modify currentStock directly - use updateProductStock
   */
  updateProduct(productId: string, updates: Partial<Omit<Product, 'productId' | 'currentStock'>>): boolean {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.productId === productId);

    if (index === -1) {
      return false;
    }

    products[index] = {
      ...products[index],
      ...updates,
      productId // Ensure ID doesn't change
    };

    this.storage.setItem(this.PRODUCTS_KEY, products);
    return true;
  }

  /**
   * Update product stock
   * IMPORTANT: Should ONLY be called by OrderService when order is created
   */
  updateProductStock(productId: string, newStock: number): boolean {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.productId === productId);

    if (index === -1) {
      return false;
    }

    products[index].currentStock = newStock;
    this.storage.setItem(this.PRODUCTS_KEY, products);
    return true;
  }

  /**
   * Delete a product
   */
  deleteProduct(productId: string): boolean {
    const products = this.getAllProducts();
    const filtered = products.filter(p => p.productId !== productId);

    if (filtered.length === products.length) {
      return false; // Product not found
    }

    this.storage.setItem(this.PRODUCTS_KEY, filtered);
    return true;
  }

  /**
   * Check if product is sold out
   */
  isSoldOut(product: Product): boolean {
    return product.currentStock === 0;
  }

  /**
   * Generate unique product ID
   */
  private generateProductId(): string {
    return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize with mock products for demo purposes
   */
  initializeMockProducts(products: Product[]): void {
    const existing = this.storage.getItem<Product[]>(this.PRODUCTS_KEY);
    if (!existing || existing.length === 0) {
      this.storage.setItem(this.PRODUCTS_KEY, products);
      console.log('✅ Mock products initialized');
    }
  }
}
