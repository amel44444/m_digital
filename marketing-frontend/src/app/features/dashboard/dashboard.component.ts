import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientService } from '../../core/services/client.service';
import { ContentService } from '../../core/services/content.service';
import { SessionService } from '../../core/services/session.service';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective, MatIcon],
  template: `
    <div class="dashboard">
      <h1>📊 Tableau de bord</h1>

      <div class="stats-grid">
        <mat-card class="stat-card blue">
          <mat-icon>business</mat-icon>
          <div>
            <h3>{{ totalClients }}</h3>
            <p>Clients actifs</p>
          </div>
        </mat-card>
        <mat-card class="stat-card green">
          <mat-icon>article</mat-icon>
          <div>
            <h3>{{ totalContents }}</h3>
            <p>Contenus publiés</p>
          </div>
        </mat-card>
        <mat-card class="stat-card orange">
          <mat-icon>event</mat-icon>
          <div>
            <h3>{{ totalSessions }}</h3>
            <p>Séances du mois</p>
          </div>
        </mat-card>
        <mat-card class="stat-card purple">
          <mat-icon>thumb_up</mat-icon>
          <div>
            <h3>{{ totalLikes }}</h3>
            <p>Likes cumulés</p>
          </div>
        </mat-card>
      </div>

      <mat-card class="chart-card">
        <h3>Activité des 6 derniers mois</h3>
        <canvas baseChart
          [data]="barData"
          [options]="barOptions"
          type="bar"></canvas>
      </mat-card>

      <mat-card class="chart-card">
        <h3>Répartition des contenus</h3>
        <canvas baseChart
          [data]="pieData"
          type="pie"></canvas>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard h1 { margin-bottom: 24px; color: #1e293b; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 20px; }
    .stat-card mat-icon { font-size: 40px; width: 40px; height: 40px; }
    .stat-card h3 { margin: 0; font-size: 28px; font-weight: 700; }
    .stat-card p { margin: 4px 0 0; color: #64748b; }
    .stat-card.blue mat-icon { color: #3b82f6; }
    .stat-card.green mat-icon { color: #10b981; }
    .stat-card.orange mat-icon { color: #f59e0b; }
    .stat-card.purple mat-icon { color: #8b5cf6; }
    .chart-card { margin-top: 24px; padding: 24px; }
    .chart-card h3 { margin: 0 0 16px; color: #1e293b; }
  `]
})
export class DashboardComponent implements OnInit {
  totalClients = 0;
  totalContents = 0;
  totalSessions = 0;
  totalLikes = 0;

  barData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Il y a 5 mois', 'Il y a 4 mois', 'Il y a 3 mois', 'Il y a 2 mois', 'Le mois dernier', 'Ce mois'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0], label: 'Publications', backgroundColor: '#3b82f6' },
      { data: [0, 0, 0, 0, 0, 0], label: 'Séances', backgroundColor: '#10b981' }
    ]
  };

  barOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  pieData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Posts', 'Vidéos', 'Stories', 'Reels'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    }]
  };

  constructor(
    private clientService: ClientService,
    private contentService: ContentService,
    private sessionService: SessionService,
    private paymentService: PaymentService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    forkJoin({
      clients: this.clientService.getAll().pipe(catchError(() => of([]))),
      contents: this.contentService.getAll().pipe(catchError(() => of([]))),
      sessions: this.sessionService.getAll().pipe(catchError(() => of([])))
    }).subscribe(({ clients, contents, sessions }) => {
      this.totalClients = clients.length;
      this.totalContents = contents.filter(c => c.status === 'PUBLISHED').length;
      this.totalSessions = sessions.filter(s => s.status === 'DONE').length;

      // Répartition
      const types = ['POST', 'VIDEO', 'STORY', 'REEL'];
      this.pieData.datasets[0].data = types.map(t => contents.filter(c => c.type === t).length);
      this.pieData = { ...this.pieData };

      // Barres (dernier mois)
      const now = new Date();
      const monthLabels: string[] = [];
      const pubData: number[] = [];
      const sesData: number[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        monthLabels.push(d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }));
        pubData.push(contents.filter(c => {
          if (!c.publishedDate) return false;
          const cd = new Date(c.publishedDate);
          return cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear();
        }).length);
        sesData.push(sessions.filter(s => s.month === d.getMonth() + 1 && s.year === d.getFullYear()).length);
      }
      this.barData = {
        ...this.barData,
        labels: monthLabels,
        datasets: [
          { ...this.barData.datasets[0], data: pubData },
          { ...this.barData.datasets[1], data: sesData }
        ]
      };
    });
  }
}
