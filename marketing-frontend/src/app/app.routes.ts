import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./shared/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'clients', loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent) },
      { path: 'clients/:id', loadComponent: () => import('./features/clients/client-detail/client-detail.component').then(m => m.ClientDetailComponent) },
      { path: 'contents', loadComponent: () => import('./features/contents/content-list/content-list.component').then(m => m.ContentListComponent) },
      { path: 'sessions', loadComponent: () => import('./features/sessions/session-list/session-list.component').then(m => m.SessionListComponent) },
      { path: 'statistics', loadComponent: () => import('./features/statistics/statistics.component').then(m => m.StatisticsComponent) },
      { path: 'payments', loadComponent: () => import('./features/payments/payment-list/payment-list.component').then(m => m.PaymentListComponent) },
      { path: 'plans', loadComponent: () => import('./features/plans/plan-list/plan-list.component').then(m => m.PlanListComponent) },
      { path: 'history', loadComponent: () => import('./features/history/history.component').then(m => m.HistoryComponent), canActivate: [roleGuard('ADMIN')] },
      { path: 'users', loadComponent: () => import('./features/users/user-list/user-list.component').then(m => m.UserListComponent), canActivate: [roleGuard('ADMIN')] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
