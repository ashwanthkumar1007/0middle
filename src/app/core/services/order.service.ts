import { Injectable } from '@angular/core';
import { Order, CreateOrderDto } from '../models/order.model';
import { StorageService } from './storage.service';
import { ProductService } from './product.service';

/**
 * OrderService - Manages all order operations
 * 
 * RESPONSIBILITIES:
 * - Create orders and update stock atomically
 * - Query orders by seller, buyer, or product
 * - Calculate statistics from orders
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ORDERS_KEY = 'omiddle_orders';

  constructor(
    private storage: StorageService,
    private productService: ProductService
  ) {}

  /**
   * Create a new order
   * IMPORTANT: This is the ONLY way stock should decrease
   * 
   * TODO: This is for future implementation - currently commented to avoid conflicts
   */
  createOrder(orderDto: CreateOrderDto): Order | null {
    // TODO: Implement when ProductService is refactored
    console.warn('createOrder not yet implemented - waiting for ProductService refactor');
    return null;
    
    /* Temporarily commented - will implement after migration
    // Validate stock availability
    const product = this.productService.getProductById(orderDto.productId);
    if (!product) {
      console.error('Product not found');
      return null;
    }

    if (product.currentStock < orderDto.quantityOrdered) {
      console.error('Insufficient stock');
      return null;
    }

    // Create order
    const order: Order = {
      orderId: this.generateOrderId(),
      buyerMobileNumber: orderDto.buyerMobileNumber,
      sellerMobileNumber: orderDto.sellerMobileNumber,
      productId: orderDto.productId,
      productName: orderDto.productName,
      quantityOrdered: orderDto.quantityOrdered,
      pricePerUnit: orderDto.pricePerUnit,
      totalPrice: orderDto.quantityOrdered * orderDto.pricePerUnit,
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Atomically: Save order + Update stock
    const orders = this.getAllOrders();
    orders.push(order);
    this.storage.setItem(this.ORDERS_KEY, orders);

    // Update product stock
    this.productService.updateProductStock(
      orderDto.productId,
      product.currentStock - orderDto.quantityOrdered
    );

    return order;
    */
  }

  /**
   * Get all orders from storage
   */
  getAllOrders(): Order[] {
    return this.storage.getItem<Order[]>(this.ORDERS_KEY) || [];
  }

  /**
   * Get orders for a specific seller
   */
  getOrdersBySeller(sellerMobileNumber: string): Order[] {
    return this.getAllOrders().filter(o => o.sellerMobileNumber === sellerMobileNumber);
  }

  /**
   * Get orders for a specific product
   */
  getOrdersByProduct(productId: string): Order[] {
    return this.getAllOrders().filter(o => o.productId === productId);
  }

  /**
   * Get orders for a specific buyer
   */
  getOrdersByBuyer(buyerMobileNumber: string): Order[] {
    return this.getAllOrders().filter(o => o.buyerMobileNumber === buyerMobileNumber);
  }

  /**
   * Calculate total units sold for a product
   */
  calculateUnitsSold(productId: string): number {
    return this.getOrdersByProduct(productId)
      .reduce((sum, order) => sum + order.quantityOrdered, 0);
  }

  /**
   * Calculate total revenue for a product
   */
  calculateProductRevenue(productId: string): number {
    return this.getOrdersByProduct(productId)
      .reduce((sum, order) => sum + order.totalPrice, 0);
  }

  /**
   * Calculate total revenue for a seller
   */
  calculateSellerRevenue(sellerMobileNumber: string): number {
    return this.getOrdersBySeller(sellerMobileNumber)
      .reduce((sum, order) => sum + order.totalPrice, 0);
  }

  /**
   * Calculate total units sold by a seller
   */
  calculateSellerUnitsSold(sellerMobileNumber: string): number {
    return this.getOrdersBySeller(sellerMobileNumber)
      .reduce((sum, order) => sum + order.quantityOrdered, 0);
  }

  /**
   * Generate unique order ID
   */
  private generateOrderId(): string {
    return `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize with mock orders for demo purposes
   */
  initializeMockOrders(orders: Order[]): void {
    const existing = this.storage.getItem<Order[]>(this.ORDERS_KEY);
    if (!existing || existing.length === 0) {
      this.storage.setItem(this.ORDERS_KEY, orders);
      console.log('✅ Mock orders initialized');
    }
  }
}
