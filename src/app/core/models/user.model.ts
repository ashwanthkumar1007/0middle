import { Product, ProductWithStats } from './product.model';

/**
 * User model representing a farmer/seller
 * 
 * NOTE: This is a transition model - will be refactored to separate concerns
 */
export interface User {
  id: string;
  name: string;
  address: string;
  mobileNumber: string;
  rating: number;
  totalProductsSold: number; // Temporary - will be calculated from orders
  totalSalesAmount: number; // Temporary - will be calculated from orders
  products: Product[]; // Temporary - will move to global products collection
}

/**
 * User with calculated statistics (from products & orders)
 * Used in UI display
 */
export interface UserWithStats extends User {
  productCount: number; // Number of products this seller has
}

/**
 * Stats card data model
 */
export interface StatsCard {
  label: string;
  value: string | number;
  icon: string;
  color: 'green' | 'blue' | 'orange';
}

// Re-export Product for backward compatibility
export { Product, ProductWithStats };
