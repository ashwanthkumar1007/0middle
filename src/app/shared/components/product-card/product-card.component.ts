import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/user.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewDetails = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}

  /**
   * Emit event to view product details
   */
  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }

  /**
   * Check if product is sold out
   */
  get isSoldOut(): boolean {
    return this.productService.isProductSoldOut(this.product);
  }

  /**
   * Get formatted quantity
   */
  get formattedQuantity(): string {
    return this.productService.formatQuantity(this.product);
  }

  /**
   * Get formatted price
   */
  get formattedPrice(): string {
    return this.productService.formatPrice(this.product.pricePerUnit);
  }

  /**
   * Get expected revenue (initial stock × price per unit)
   */
  get expectedRevenue(): number {
    const initialStock = this.product.initialStock || 0;
    const pricePerUnit = this.product.pricePerUnit || 0;
    return initialStock * pricePerUnit;
  }

  /**
   * Get formatted expected revenue
   */
  get formattedExpectedRevenue(): string {
    return this.productService.formatPrice(this.expectedRevenue);
  }
}
