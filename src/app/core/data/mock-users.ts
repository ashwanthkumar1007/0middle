import { User } from '../models/user.model';
import { getProductImageUrl } from './product-images';

/**
 * Mock data for users - to be stored in localStorage
 * This simulates a database of farmers/sellers
 * Uses placeholder images for reliable static app performance
 */
export const MOCK_USERS: User[] = [
  {
    id: 'user-001',
    name: 'Ash',
    address: 'Village Kheda, Tehsil Merta, District Nagaur, Rajasthan - 341510',
    mobileNumber: '9876543210',
    rating: 4.8,
    totalProductsSold: 1250,
    totalSalesAmount: 485000,
    products: [
      {
        productId: 'prod-001',
        name: 'Wheat Flour',
        imageUrl: getProductImageUrl('Wheat Flour'),
        unit: 'kg',
        pricePerUnit: 45,
        initialStock: 300,
        currentStock: 120,
        unitsSold: 180,
        createdDate: '2025-11-15'
      },
      {
        productId: 'prod-002',
        name: 'Basmati Rice',
        imageUrl: getProductImageUrl('Basmati Rice'),
        unit: 'kg',
        pricePerUnit: 85,
        initialStock: 850,
        currentStock: 0,
        unitsSold: 850,
        createdDate: '2025-10-20'
      },
      {
        productId: 'prod-003',
        name: 'Toor Dal (Pigeon Peas)',
        imageUrl: getProductImageUrl('Toor Dal'),
        unit: 'kg',
        pricePerUnit: 120,
        initialStock: 145,
        currentStock: 25,
        unitsSold: 120,
        createdDate: '2025-12-01'
      },
      {
        productId: 'prod-015',
        name: 'Organic Honey',
        imageUrl: getProductImageUrl('Organic Honey'),
        unit: 'liter',
        pricePerUnit: 450,
        initialStock: 130,
        currentStock: 45,
        unitsSold: 85,
        createdDate: '2025-11-28'
      }
    ]
  },
  {
    id: 'user-002',
    name: 'Arun',
    address: 'Taluka Anand, District Kheda, Gujarat - 388001',
    mobileNumber: '9123456789',
    rating: 4.6,
    totalProductsSold: 980,
    totalSalesAmount: 325000,
    products: [
      {
        productId: 'prod-004',
        name: 'White Rice',
        imageUrl: getProductImageUrl('White Rice'),
        unit: 'kg',
        pricePerUnit: 65,
        initialStock: 600,
        currentStock: 150,
        unitsSold: 450,
        createdDate: '2025-11-01'
      },
      {
        productId: 'prod-005',
        name: 'Sugar',
        imageUrl: getProductImageUrl('Sugar'),
        unit: 'kg',
        pricePerUnit: 55,
        initialStock: 262,
        currentStock: 180,
        unitsSold: 82,
        createdDate: '2025-10-10'
      }
    ]
  },
  {
    id: 'user-003',
    name: 'Tom',
    address: 'Block Gola Gokaran Nath, District Lakhimpur Kheri, Uttar Pradesh - 262802',
    mobileNumber: '9988776655',
    rating: 4.9,
    totalProductsSold: 1580,
    totalSalesAmount: 620000,
    products: [
      {
        productId: 'prod-006',
        name: 'Moong Dal (Green Gram)',
        imageUrl: getProductImageUrl('Moong Dal'),
        unit: 'kg',
        pricePerUnit: 130,
        initialStock: 190,
        currentStock: 95,
        unitsSold: 95,
        createdDate: '2025-09-15'
      },
      {
        productId: 'prod-007',
        name: 'Chana Dal (Bengal Gram)',
        imageUrl: getProductImageUrl('Chana Dal'),
        unit: 'kg',
        pricePerUnit: 110,
        initialStock: 385,
        currentStock: 65,
        unitsSold: 320,
        createdDate: '2025-11-20'
      },
      {
        productId: 'prod-008',
        name: 'Sona Masoori Rice',
        imageUrl: getProductImageUrl('Sona Masoori Rice'),
        unit: 'kg',
        pricePerUnit: 70,
        initialStock: 1200,
        currentStock: 0,
        unitsSold: 1200,
        createdDate: '2025-12-05'
      },
      {
        productId: 'prod-016',
        name: 'Turmeric Powder',
        imageUrl: getProductImageUrl('Turmeric Powder'),
        unit: 'kg',
        pricePerUnit: 280,
        initialStock: 220,
        currentStock: 55,
        unitsSold: 165,
        createdDate: '2025-12-03'
      }
    ]
  },
  {
    id: 'user-004',
    name: 'Dhinesh',
    address: 'Mandal Medak, District Medak, Telangana - 502110',
    mobileNumber: '9445566778',
    rating: 4.7,
    totalProductsSold: 720,
    totalSalesAmount: 280000,
    products: [
      {
        productId: 'prod-009',
        name: 'Cooking Oil (Sunflower)',
        imageUrl: getProductImageUrl('Cooking Oil'),
        unit: 'liter',
        pricePerUnit: 180,
        initialStock: 465,
        currentStock: 85,
        unitsSold: 380,
        createdDate: '2025-10-25'
      },
      {
        productId: 'prod-010',
        name: 'Urad Dal (Black Gram)',
        imageUrl: getProductImageUrl('Urad Dal'),
        unit: 'kg',
        pricePerUnit: 140,
        initialStock: 252,
        currentStock: 42,
        unitsSold: 210,
        createdDate: '2025-11-10'
      },
      {
        productId: 'prod-017',
        name: 'Jaggery (Gur)',
        imageUrl: getProductImageUrl('Jaggery'),
        unit: 'kg',
        pricePerUnit: 75,
        initialStock: 430,
        currentStock: 190,
        unitsSold: 240,
        createdDate: '2025-11-18'
      }
    ]
  },
  {
    id: 'user-005',
    name: 'Sam',
    address: 'Tehsil Malkapur, District Buldana, Maharashtra - 443101',
    mobileNumber: '9001122334',
    rating: 4.5,
    totalProductsSold: 560,
    totalSalesAmount: 195000,
    products: [
      {
        productId: 'prod-011',
        name: 'Iodized Salt',
        imageUrl: getProductImageUrl('Iodized Salt'),
        unit: 'kg',
        pricePerUnit: 25,
        initialStock: 375,
        currentStock: 280,
        unitsSold: 95,
        createdDate: '2025-11-05'
      },
      {
        productId: 'prod-012',
        name: 'Masoor Dal (Red Lentils)',
        imageUrl: getProductImageUrl('Masoor Dal'),
        unit: 'kg',
        pricePerUnit: 95,
        initialStock: 400,
        currentStock: 120,
        unitsSold: 280,
        createdDate: '2025-12-01'
      },
      {
        productId: 'prod-018',
        name: 'Organic Cane Sugar',
        imageUrl: getProductImageUrl('Organic Cane Sugar'),
        unit: 'kg',
        pricePerUnit: 65,
        initialStock: 405,
        currentStock: 210,
        unitsSold: 195,
        createdDate: '2025-11-22'
      }
    ]
  },
  {
    id: 'user-006',
    name: 'Raj',
    address: 'Block Saran, District Chapra, Bihar - 841301',
    mobileNumber: '9667788990',
    rating: 4.4,
    totalProductsSold: 890,
    totalSalesAmount: 340000,
    products: [
      {
        productId: 'prod-013',
        name: 'Jowar Flour (Sorghum)',
        imageUrl: getProductImageUrl('Jowar Flour'),
        unit: 'kg',
        pricePerUnit: 50,
        initialStock: 515,
        currentStock: 95,
        unitsSold: 420,
        createdDate: '2025-10-18'
      },
      {
        productId: 'prod-014',
        name: 'Rajma (Kidney Beans)',
        imageUrl: getProductImageUrl('Rajma'),
        unit: 'kg',
        pricePerUnit: 115,
        initialStock: 190,
        currentStock: 35,
        unitsSold: 155,
        createdDate: '2025-11-25'
      }
    ]
  }
];

/**
 * Initialize localStorage with mock users
 * This runs once to populate the "database"
 * Uses placeholder images for reliable performance
 */
export function initializeMockData(): void {
  const existingData = localStorage.getItem('omiddle_users_db');
  
  if (!existingData) {
    localStorage.setItem('omiddle_users_db', JSON.stringify(MOCK_USERS));
    console.log('✅ Mock user database initialized with placeholder images');
  }
}
