import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {
  title = 'Farmer / Seller Portal';
}
