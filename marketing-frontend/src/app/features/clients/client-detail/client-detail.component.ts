import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ClientService } from '../../../core/services/client.service';
import { ContentService } from '../../../core/services/content.service';
import { SessionService } from '../../../core/services/session.service';
import { PaymentService } from '../../../core/services/payment.service';
import { PlanService } from '../../../core/services/plan.service';
import { Client } from '../../../core/models/client.model';
import { Content } from '../../../core/models/content.model';
import { SessionSeance } from '../../../core/models/session.model';
import { Payment } from '../../../core/models/payment.model';
import { CommunicationPlan } from '../../../core/models/plan.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTabsModule, MatCardModule],
  template: `
    <div class="page">
      <a routerLink="/clients" class="back">← Retour</a>
      <h1 *ngIf="client">{{ client.companyName }}</h1>

      <mat-tab-group *ngIf="client">
        <mat-tab label="Contenus">
          <div class="tab-content">
            <mat-card *ngFor="let c of contents" class="item">
              <strong>{{ c.title }}</strong> — <span class="badge">{{ c.status }}</span>
              <span class="type">{{ c.type }}</span>
            </mat-card>
            <p *ngIf="contents.length === 0" class="empty">Aucun contenu.</p>
          </div>
        </mat-tab>

        <mat-tab label="Séances">
          <div class="tab-content">
            <mat-card *ngFor="let s of sessions" class="item">
              📅 {{ s.sessionDate | date:'short' }} — <span class="badge">{{ s.status }}</span>
            </mat-card>
            <p *ngIf="sessions.length === 0" class="empty">Aucune séance.</p>
          </div>
        </mat-tab>

        <mat-tab label="Paiements">
          <div class="tab-content">
            <mat-card *ngFor="let p of payments" class="item">
              💰 {{ p.amount }} DH — {{ p.month }}/{{ p.year }} — <span class="badge">{{ p.status }}</span>
            </mat-card>
            <p *ngIf="payments.length === 0" class="empty">Aucun paiement.</p>
          </div>
        </mat-tab>

        <mat-tab label="Plan 12 mois">
          <div class="tab-content">
            <mat-card *ngFor="let pl of plans" class="item">
              <strong>{{ pl.month }}/{{ pl.year }}</strong> — {{ pl.objectives }}
            </mat-card>
            <p *ngIf="plans.length === 0" class="empty">Aucun plan.</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .back { color: #3b82f6; text-decoration: none; }
    h1 { color: #1e293b; margin: 12px 0 20px; }
    .tab-content { padding: 20px 0; display: flex; flex-direction: column; gap: 10px; }
    .item { padding: 16px; display: flex; align-items: center; gap: 12px; }
    .badge { background: #e0e7ff; color: #3730a3; padding: 2px 10px; border-radius: 12px; font-size: 12px; }
    .type { color: #64748b; font-size: 12px; }
    .empty { color: #94a3b8; text-align: center; padding: 20px; }
  `]
})
export class ClientDetailComponent implements OnInit {
  client?: Client;
  contents: Content[] = [];
  sessions: SessionSeance[] = [];
  payments: Payment[] = [];
  plans: CommunicationPlan[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private contentService: ContentService,
    private sessionService: SessionService,
    private paymentService: PaymentService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getById(id).subscribe(c => this.client = c);
    this.contentService.getByClient(id).subscribe(d => this.contents = d);
    this.sessionService.getByClient(id).subscribe(d => this.sessions = d);
    this.paymentService.getByClient(id).subscribe(d => this.payments = d);
    this.planService.getByClient(id).subscribe(d => this.plans = d);
  }
}
