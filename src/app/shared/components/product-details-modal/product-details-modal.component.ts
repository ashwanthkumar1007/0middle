import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../core/models/user.model';
import { ProductService } from '../../../core/services/product.service';
import { UNIT_CONFIGS, UnitConfig } from '../../../core/constants/units.constants';

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss']
})
export class ProductDetailsModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<string>();

  productForm!: FormGroup;
  isSubmitting = false;
  
  // Make units available to template
  availableUnits: UnitConfig[] = UNIT_CONFIGS;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reinitialize form when product or editMode changes
    if ((changes['product'] || changes['isEditMode']) && this.productForm) {
      this.initializeForm();
    }
  }

  /**
   * Initialize the form with product data or empty values
   */
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required, Validators.minLength(3)]],
      imageUrl: [this.product?.imageUrl || ''],
      currentStock: [this.product?.currentStock || 0, [Validators.required, Validators.min(0)]],
      unit: [this.product?.unit || 'kg', [Validators.required]],
      pricePerUnit: [this.product?.pricePerUnit || 0, [Validators.required, Validators.min(0.01)]],
      unitsSold: [this.product?.unitsSold || 0, [Validators.required, Validators.min(0)]]
    });

    // Disable form if not in edit mode
    if (!this.isEditMode) {
      this.productForm.disable();
    }
  }

  /**
   * Handle image file selection
   */
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      this.productForm.patchValue({ imageUrl: base64String });
      
      // Update product preview
      if (this.product) {
        this.product = { ...this.product, imageUrl: base64String };
      }
    };
    reader.readAsDataURL(file);
  }

  /**
   * Get calculated product revenue
   */
  get productRevenue(): number {
    if (!this.product) return 0;
    return this.productService.calculateProductRevenue(this.product);
  }

  /**
   * Get formatted price
   */
  get formattedPrice(): string {
    const price = this.isEditMode 
      ? this.productForm.get('pricePerUnit')?.value 
      : this.product?.pricePerUnit || 0;
    return this.productService.formatPrice(price);
  }

  /**
   * Get formatted revenue
   */
  get formattedRevenue(): string {
    return this.productService.formatPrice(this.productRevenue);
  }

  /**
   * Get expected revenue (initial stock × price per unit)
   */
  get expectedRevenue(): number {
    if (!this.product) return 0;
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

  /**
   * Get formatted quantity
   */
  get formattedQuantity(): string {
    const quantity = this.isEditMode 
      ? this.productForm.get('currentStock')?.value 
      : this.product?.currentStock || 0;
    const unit = this.isEditMode 
      ? this.productForm.get('unit')?.value 
      : this.product?.unit || '';
    return `${quantity} ${unit}`;
  }

  /**
   * Toggle edit mode
   */
  onEdit(): void {
    this.isEditMode = true;
    this.productForm.enable();
  }

  /**
   * Cancel edit mode
   */
  onCancelEdit(): void {
    this.isEditMode = false;
    this.initializeForm();
  }

  /**
   * Save product changes
   */
  onSave(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValue = this.productForm.value;
    
    const updatedProduct: Product = {
      ...this.product!,
      ...formValue,
      createdDate: this.product?.createdDate || new Date().toISOString().split('T')[0]
    };

    // For new products, set initialStock to currentStock
    if (!updatedProduct.productId || updatedProduct.productId === '') {
      updatedProduct.initialStock = formValue.currentStock;
    } else if (!updatedProduct.initialStock) {
      // For existing products without initialStock, preserve it or set it
      updatedProduct.initialStock = this.product?.initialStock || formValue.currentStock;
    }

    this.save.emit(updatedProduct);
    this.isSubmitting = false;
    this.isEditMode = false;
  }

  /**
   * Delete product
   */
  onDelete(): void {
    if (!this.product) return;
    
    const confirmed = confirm(`Are you sure you want to delete "${this.product.name}"?`);
    if (confirmed) {
      this.delete.emit(this.product.productId);
    }
  }

  /**
   * Close modal
   */
  onClose(): void {
    if (this.isEditMode) {
      const confirmed = confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    
    this.close.emit();
  }

  /**
   * Prevent click propagation on modal content
   */
  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Check if form field has error
   */
  hasError(field: string, error: string): boolean {
    const control = this.productForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched));
  }
}
