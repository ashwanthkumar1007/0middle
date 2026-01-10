import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth/mobile',
    loadComponent: () => import('./pages/mobile-number/mobile-number.component').then(m => m.MobileNumberComponent)
  },
  {
    path: 'seller',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/seller-dashboard/seller-dashboard.component').then(m => m.SellerDashboardComponent)
  },
  {
    path: 'consumer',
    loadComponent: () => import('./pages/consumer/consumer.component').then(m => m.ConsumerComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
