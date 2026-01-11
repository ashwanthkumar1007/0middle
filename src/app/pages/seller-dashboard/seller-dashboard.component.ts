import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User, Product, StatsCard } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { ProductService } from '../../core/services/product.service';
import { ProductStorageService } from '../../core/services/product-storage.service';
import { StorageService } from '../../core/services/storage.service';
import { StatsCardComponent } from '../../shared/components/stats-card/stats-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductDetailsModalComponent } from '../../shared/components/product-details-modal/product-details-modal.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardComponent,
    ProductCardComponent,
    ProductDetailsModalComponent,
    SidebarComponent
  ],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
  user: User | null = null;
  products: Product[] = [];
  statsCards: StatsCard[] = [];
  isLoading = true;
  isSidebarOpen = false;
  isProductModalOpen = false;
  selectedProduct: Product | null = null;
  isEditMode = false;
  sellerMobileNumber: string = '';

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private productStorageService: ProductStorageService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Load user data and products from localStorage
   */
  private loadUserData(): void {
    this.sellerMobileNumber = this.storageService.getMobileNumber() || '';
    
    if (!this.sellerMobileNumber) {
      // Redirect to auth if no mobile number found
      this.router.navigate(['/auth/mobile'], { queryParams: { role: 'farmer' } });
      return;
    }

    // Get user info from UserService (for name, address, etc.)
    this.user = this.userService.getUserByMobile(this.sellerMobileNumber);
    
    if (!this.user) {
      // User not found, redirect to auth
      this.router.navigate(['/auth/mobile'], { queryParams: { role: 'farmer' } });
      return;
    }

    // Load products from ProductStorageService (single source of truth)
    this.loadProducts();
    
    this.isLoading = false;
  }

  /**
   * Load products for the current seller
   */
  private loadProducts(): void {
    this.products = this.productStorageService.getProductsBySeller(this.sellerMobileNumber);
    this.calculateStats();
  }

  /**
   * Calculate and set stats cards
   */
  private calculateStats(): void {
    const stats = this.productStorageService.getSellerStats(this.sellerMobileNumber);

    this.statsCards = [
      {
        icon: '📦',
        value: stats.totalProducts.toString(),
        label: 'Total Products',
        color: 'green'
      },
      {
        icon: '✅',
        value: stats.totalUnitsSold.toString(),
        label: 'Units Sold',
        color: 'blue'
      },
      {
        icon: '💰',
        value: this.productService.formatPrice(stats.totalRevenue),
        label: 'Total Revenue',
        color: 'orange'
      }
    ];
  }

  /**
   * Open sidebar
   */
  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  /**
   * Close sidebar
   */
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  /**
   * Handle logout
   */
  onLogout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.storageService.clearAuthData();
      this.router.navigate(['/']);
    }
  }

  /**
   * Open product details modal
   */
  openProductModal(product: Product): void {
    this.selectedProduct = product;
    this.isEditMode = false;
    this.isProductModalOpen = true;
  }

  /**
   * Close product details modal
   */
  closeProductModal(): void {
    this.isProductModalOpen = false;
    this.selectedProduct = null;
    this.isEditMode = false;
  }

  /**
   * Save product changes
   */
  onSaveProduct(updatedProduct: Product): void {
    // Update product in ProductStorageService
    const success = this.productStorageService.updateProduct(updatedProduct.productId, updatedProduct);

    if (success) {
      // Reload products
      this.loadProducts();
      
      // Close modal
      this.closeProductModal();
    }
  }

  /**
   * Delete product
   */
  onDeleteProduct(productId: string): void {
    // Delete product from ProductStorageService
    const success = this.productStorageService.deleteProduct(productId);

    if (success) {
      // Reload products
      this.loadProducts();
      
      // Close modal
      this.closeProductModal();
    }
  }

  /**
   * Open add product modal - Navigate to dedicated page
   */
  openAddProductModal(): void {
    this.router.navigate(['/add-product']);
  }

  /**
   * Add new product (deprecated - now using dedicated page)
   */
  onAddProduct(newProduct: Product): void {
    // This method is deprecated
    // Products are now added via /add-product route
    this.closeProductModal();
  }
}
