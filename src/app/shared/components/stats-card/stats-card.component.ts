import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCard } from '../../../core/models/user.model';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() color: 'green' | 'blue' | 'orange' = 'green';
}
