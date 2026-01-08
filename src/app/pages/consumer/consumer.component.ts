import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent {
  title = 'Consumer / Buyer Portal';
}
