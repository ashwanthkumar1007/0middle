/**
 * Order model representing a buyer's purchase
 * Orders are the source of truth for:
 * - Units sold (derived from orders)
 * - Revenue (calculated from orders)
 * - Stock reduction (applied when order is created)
 */
export interface Order {
  orderId: string;
  buyerMobileNumber: string;
  sellerMobileNumber: string;
  productId: string;
  productName: string;
  quantityOrdered: number;
  pricePerUnit: number;
  totalPrice: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

/**
 * Order creation DTO (Data Transfer Object)
 */
export interface CreateOrderDto {
  buyerMobileNumber: string;
  sellerMobileNumber: string;
  productId: string;
  productName: string;
  quantityOrdered: number;
  pricePerUnit: number;
}
