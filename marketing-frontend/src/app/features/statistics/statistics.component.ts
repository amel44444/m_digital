import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { StatisticService } from '../../core/services/statistic.service';
import { ClientService } from '../../core/services/client.service';
import { ContentService } from '../../core/services/content.service';
import { Client } from '../../core/models/client.model';
import { Content } from '../../core/models/content.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatSelectModule, MatButtonModule, MatIconModule, BaseChartDirective
  ],
  template: `
    <div class="page">
      <h1>📈 Statistiques & Performance</h1>

      <mat-card class="selector">
        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <mat-select [formControl]="clientCtrl" (selectionChange)="onClientChange()">
            <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Contenu</mat-label>
          <mat-select [formControl]="contentCtrl">
            <mat-option *ngFor="let c of contents" [value]="c.id">{{ c.title }}</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="loadStats()">Charger</button>
      </mat-card>

      <div class="stats-grid" *ngIf="totals">
        <mat-card class="stat"><mat-icon>thumb_up</mat-icon><h3>{{ totals.likes }}</h3><p>Likes</p></mat-card>
        <mat-card class="stat"><mat-icon>comment</mat-icon><h3>{{ totals.comments }}</h3><p>Commentaires</p></mat-card>
        <mat-card class="stat"><mat-icon>share</mat-icon><h3>{{ totals.shares }}</h3><p>Partages</p></mat-card>
        <mat-card class="stat"><mat-icon>visibility</mat-icon><h3>{{ totals.views }}</h3><p>Vues</p></mat-card>
      </div>

      <mat-card class="chart-card" *ngIf="stats.length > 0">
        <h3>Évolution dans le temps</h3>
        <canvas baseChart [data]="lineData" type="line"></canvas>
      </mat-card>
    </div>
  `,
  styles: [`
    h1 { color: #1e293b; margin-bottom: 20px; }
    .selector { display: flex; gap: 16px; align-items: center; padding: 20px; margin-bottom: 20px; flex-wrap: wrap; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 20px; }
    .stat { display: flex; align-items: center; gap: 16px; padding: 20px; }
    .stat mat-icon { font-size: 36px; width: 36px; height: 36px; color: #3b82f6; }
    .stat h3 { margin: 0; font-size: 26px; }
    .stat p { margin: 0; color: #64748b; }
    .chart-card { padding: 24px; }
  `]
})
export class StatisticsComponent implements OnInit {
  clients: Client[] = [];
  contents: Content[] = [];
  stats: any[] = [];
  totals: any = null;

  clientCtrl: FormControl;
  contentCtrl: FormControl;

  lineData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Likes', borderColor: '#3b82f6', backgroundColor: '#3b82f622', tension: 0.3 },
      { data: [], label: 'Vues', borderColor: '#10b981', backgroundColor: '#10b98122', tension: 0.3 }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private statService: StatisticService,
    private clientService: ClientService,
    private contentService: ContentService
  ) {
    this.clientCtrl = this.fb.control<number | null>(null);
    this.contentCtrl = this.fb.control<number | null>(null);
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
  }

  onClientChange(): void {
    const id = this.clientCtrl.value;
    if (!id) return;
    this.contentService.getByClient(id).subscribe(c => this.contents = c);
    this.statService.getTotals(id).subscribe((res: any) => {
      const arr = Array.isArray(res[0]) ? res[0] : res;
      this.totals = {
        likes: arr[0] ?? 0,
        comments: arr[1] ?? 0,
        shares: arr[2] ?? 0,
        views: arr[3] ?? 0
      };
    });
  }

  loadStats(): void {
    const contentId = this.contentCtrl.value;
    if (!contentId) return;
    this.statService.getByContent(contentId).subscribe(data => {
      this.stats = data;
      this.lineData = {
        labels: data.map(s => new Date(s.recordedAt!).toLocaleDateString('fr-FR')),
        datasets: [
          { ...this.lineData.datasets[0], data: data.map(s => s.likes) },
          { ...this.lineData.datasets[1], data: data.map(s => s.views) }
        ]
      };
    });
  }
}
