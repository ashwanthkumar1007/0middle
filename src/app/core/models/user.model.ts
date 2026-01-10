import { UnitType } from '../constants/units.constants';

/**
 * User model representing a farmer/seller
 */
export interface User {
  id: string;
  name: string;
  address: string;
  mobileNumber: string;
  rating: number;
  totalProductsSold: number;
  totalSalesAmount: number;
  products: Product[];
}

/**
 * Product model
 */
export interface Product {
  productId: string;
  name: string;
  imageUrl: string;
  unit: UnitType;
  pricePerUnit: number;
  currentStock: number;
  unitsSold: number;
  createdDate: string;
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
