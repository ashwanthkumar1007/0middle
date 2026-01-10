import { UnitType } from '../constants/units.constants';

/**
 * Product model - Belongs to a seller
 * 
 * TRANSITION MODEL: Currently supports both old and new architecture
 */
export interface Product {
  productId: string;
  sellerMobileNumber?: string; // Optional during transition - Links product to seller
  name: string;
  imageUrl: string;
  unit: UnitType;
  pricePerUnit: number;
  initialStock?: number; // Optional - Never changes - for reference
  currentStock: number; // Decreases with each order
  unitsSold?: number; // Temporary - will be calculated from orders
  createdDate: string;
}

/**
 * Product with calculated statistics (from orders)
 * Used in UI display
 */
export interface ProductWithStats extends Product {
  unitsSold: number; // Calculated from orders
  revenue: number; // Calculated from orders
  isSoldOut: boolean; // currentStock === 0
}
