import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User, Product, StatsCard } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { ProductService } from '../../core/services/product.service';
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
  statsCards: StatsCard[] = [];
  isLoading = true;
  isSidebarOpen = false;
  isProductModalOpen = false;
  selectedProduct: Product | null = null;
  isEditMode = false;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Load user data from localStorage
   */
  private loadUserData(): void {
    const mobileNumber = this.storageService.getMobileNumber();
    
    if (!mobileNumber) {
      // Redirect to auth if no mobile number found
      this.router.navigate(['/auth/mobile'], { queryParams: { role: 'farmer' } });
      return;
    }

    this.user = this.userService.getUserByMobile(mobileNumber);
    
    if (!this.user) {
      // User not found, redirect to auth
      this.router.navigate(['/auth/mobile'], { queryParams: { role: 'farmer' } });
      return;
    }

    this.calculateStats();
    this.isLoading = false;
  }

  /**
   * Calculate and set stats cards
   */
  private calculateStats(): void {
    if (!this.user) return;

    const totalProducts = this.user.products.length;
    const totalSold = this.user.products.reduce((sum: number, p: Product) => sum + p.unitsSold, 0);
    const totalRevenue = this.userService.calculateTotalSalesAmount(this.user);

    this.statsCards = [
      {
        icon: '📦',
        value: totalProducts.toString(),
        label: 'Total Products',
        color: 'green'
      },
      {
        icon: '✅',
        value: totalSold.toString(),
        label: 'Units Sold',
        color: 'blue'
      },
      {
        icon: '💰',
        value: this.productService.formatPrice(totalRevenue),
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
    if (!this.user) return;

    // Update product
    this.productService.updateProduct(this.user.id, updatedProduct.productId, updatedProduct);

    // Reload user data
    this.loadUserData();

    // Close modal
    this.closeProductModal();
  }

  /**
   * Delete product
   */
  onDeleteProduct(productId: string): void {
    if (!this.user) return;

    // Delete product
    this.productService.deleteProduct(this.user.id, productId);

    // Reload user data
    this.loadUserData();

    // Close modal
    this.closeProductModal();
  }

  /**
   * Open add product modal
   */
  openAddProductModal(): void {
    this.selectedProduct = {
      productId: '',
      name: '',
      imageUrl: '',
      currentStock: 0,
      unit: 'kg',
      pricePerUnit: 0,
      unitsSold: 0,
      createdDate: new Date().toISOString()
    };
    this.isEditMode = true;
    this.isProductModalOpen = true;
  }

  /**
   * Add new product
   */
  onAddProduct(newProduct: Product): void {
    if (!this.user) return;

    // Add product
    this.productService.addProduct(this.user.id, newProduct);

    // Reload user data
    this.loadUserData();

    // Close modal
    this.closeProductModal();
  }
}
