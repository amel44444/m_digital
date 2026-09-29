// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../../../core/services/auth.service';
//
// @Component({
//   selector: 'app-main-layout',
//   standalone: true,
//   imports: [
//     CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
//     MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule
//   ],
//   template: `
//     <mat-sidenav-container class="layout">
//       <mat-sidenav mode="side" opened class="sidebar">
//         <div class="brand">
//           <mat-icon>dashboard</mat-icon>
//           <span>CM Platform</span>
//         </div>
//         <mat-nav-list>
//           <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
//             <mat-icon matListItemIcon>home</mat-icon>
//             <span matListItemTitle>Tableau de bord</span>
//           </a>
//           <a mat-list-item routerLink="/clients" routerLinkActive="active">
//             <mat-icon matListItemIcon>business</mat-icon>
//             <span matListItemTitle>Clients</span>
//           </a>
//           <a mat-list-item routerLink="/contents" routerLinkActive="active">
//             <mat-icon matListItemIcon>article</mat-icon>
//             <span matListItemTitle>Contenus</span>
//           </a>
//           <a mat-list-item routerLink="/sessions" routerLinkActive="active">
//             <mat-icon matListItemIcon>event</mat-icon>
//             <span matListItemTitle>Séances</span>
//           </a>
//           <a mat-list-item routerLink="/statistics" routerLinkActive="active">
//             <mat-icon matListItemIcon>bar_chart</mat-icon>
//             <span matListItemTitle>Statistiques</span>
//           </a>
//           <a mat-list-item routerLink="/payments" routerLinkActive="active">
//             <mat-icon matListItemIcon>payment</mat-icon>
//             <span matListItemTitle>Paiements</span>
//           </a>
//           <a mat-list-item routerLink="/plans" routerLinkActive="active">
//             <mat-icon matListItemIcon>map</mat-icon>
//             <span matListItemTitle>Plan 12 mois</span>
//           </a>
//         </mat-nav-list>
//       </mat-sidenav>
//
//       <mat-sidenav-content>
//         <mat-toolbar color="primary" class="navbar">
//           <span class="spacer"></span>
//           <button mat-icon-button (click)="logout()" title="Déconnexion">
//             <mat-icon>logout</mat-icon>
//           </button>
//         </mat-toolbar>
//         <div class="content">
//           <router-outlet />
//         </div>
//       </mat-sidenav-content>
//     </mat-sidenav-container>
//   `,
//   styles: [`
//     .layout { height: 100vh; }
//     .sidebar { width: 260px; background: #1e293b; color: white; }
//     .brand { display: flex; align-items: center; gap: 12px; padding: 20px; font-size: 20px; font-weight: 600; border-bottom: 1px solid #334155; }
//     .brand mat-icon { color: #60a5fa; }
//     mat-nav-list a { color: #cbd5e1 !important; }
//     mat-nav-list a.active { background: #334155 !important; color: white !important; }
//     .navbar { position: sticky; top: 0; z-index: 10; }
//     .spacer { flex: 1; }
//     .content { padding: 24px; background: #f1f5f9; min-height: calc(100vh - 64px); }
//   `]
// })
// export class MainLayoutComponent {
//   constructor(public auth: AuthService) {}
//
//   logout(): void { this.auth.logout(); }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="layout">
      <mat-sidenav mode="side" opened class="sidebar">
        <div class="brand">
          <mat-icon>campaign</mat-icon>
          <!-- 🏷️ Changez le nom ici -->
          <span>Travail en exécution</span>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Tableau de bord</span>
          </a>
          <a mat-list-item routerLink="/clients" routerLinkActive="active">
            <mat-icon matListItemIcon>business</mat-icon>
            <span matListItemTitle>Clients</span>
          </a>
          <a mat-list-item routerLink="/contents" routerLinkActive="active">
            <mat-icon matListItemIcon>article</mat-icon>
            <span matListItemTitle>Contenus</span>
          </a>
          <a mat-list-item routerLink="/sessions" routerLinkActive="active">
            <mat-icon matListItemIcon>event</mat-icon>
            <span matListItemTitle>Séances</span>
          </a>
          <a mat-list-item routerLink="/statistics" routerLinkActive="active">
            <mat-icon matListItemIcon>bar_chart</mat-icon>
            <span matListItemTitle>Statistiques</span>
          </a>
          <a mat-list-item routerLink="/payments" routerLinkActive="active">
            <mat-icon matListItemIcon>payment</mat-icon>
            <span matListItemTitle>Paiements</span>
          </a>
          <a mat-list-item routerLink="/plans" routerLinkActive="active">
            <mat-icon matListItemIcon>map</mat-icon>
            <span matListItemTitle>Plan 12 mois</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="navbar">
          <span class="spacer"></span>
          <button mat-icon-button (click)="logout()" title="Déconnexion">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>
        <div class="content">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout { height: 100vh; }

    /* 🎨 Sidebar clair */
    .sidebar {
      width: 260px;
      background: #f8fafc;
      color: #1e293b;
      border-right: 1px solid #e2e8f0;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      font-size: 20px;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    .brand mat-icon { color: #3b82f6; }

    mat-nav-list a { color: #475569 !important; }
    mat-nav-list a:hover { background: #e2e8f0 !important; }
    mat-nav-list a.active {
      background: #dbeafe !important;
      color: #1e40af !important;
    }
    mat-nav-list a.active mat-icon { color: #1e40af !important; }

    .navbar { position: sticky; top: 0; z-index: 10; }
    .spacer { flex: 1; }
    .content {
      padding: 24px;
      background: #f1f5f9;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class MainLayoutComponent {
  constructor(public auth: AuthService) {}

  logout(): void { this.auth.logout(); }
}
