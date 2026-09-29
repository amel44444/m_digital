import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlanService } from '../../../core/services/plan.service';
import { ClientService } from '../../../core/services/client.service';
import { CommunicationPlan } from '../../../core/models/plan.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule
  ],
  template: `
    <div class="page">
      <h1>🗺️ Plan de communication — 12 mois</h1>

      <mat-card class="form-card">
        <h3>Ajouter un mois au plan</h3>
        <form [formGroup]="form" (ngSubmit)="create()" class="form">
          <mat-form-field appearance="outline">
            <mat-label>Client</mat-label>
            <mat-select formControlName="clientId" (selectionChange)="loadPlans($event.value)">
              <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mois</mat-label>
            <input matInput type="number" formControlName="month" min="1" max="12">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Année</mat-label>
            <input matInput type="number" formControlName="year">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Objectifs</mat-label>
            <textarea matInput formControlName="objectives" rows="2"></textarea>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Thèmes</mat-label>
            <textarea matInput formControlName="themes" rows="2"></textarea>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Audience cible</mat-label>
            <textarea matInput formControlName="targetAudience" rows="2"></textarea>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Enregistrer</button>
        </form>
      </mat-card>

      <div class="plans-grid">
        <mat-card *ngFor="let p of plans" class="plan-card">
          <div class="plan-header">
            <mat-icon>calendar_month</mat-icon>
            <strong>{{ monthName(p.month) }} {{ p.year }}</strong>
          </div>
          <p><strong>🎯 Objectifs :</strong> {{ p.objectives || '—' }}</p>
          <p><strong>💡 Thèmes :</strong> {{ p.themes || '—' }}</p>
          <p><strong>👥 Audience :</strong> {{ p.targetAudience || '—' }}</p>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    h1 { color: #1e293b; margin-bottom: 20px; }
    .form-card { padding: 20px; margin-bottom: 20px; }
    .form-card h3 { margin: 0 0 12px; }
    .form { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .full { grid-column: 1 / -1; }
    .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .plan-card { padding: 20px; }
    .plan-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #3b82f6; font-size: 18px; }
    .plan-card p { margin: 6px 0; color: #475569; font-size: 14px; }
  `]
})
export class PlanListComponent implements OnInit {
  clients: Client[] = [];
  plans: CommunicationPlan[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PlanService,
    private clientService: ClientService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      clientId: [null as number | null, Validators.required],
      month: [new Date().getMonth() + 1, Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      objectives: [''],
      themes: [''],
      targetAudience: ['']
    });
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
  }

  loadPlans(clientId: number): void {
    if (!clientId) return;
    this.service.getByClient(clientId).subscribe(d => this.plans = d);
  }

  create(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.snack.open('Plan mis à jour ✅', '', { duration: 2000 });
        this.loadPlans(this.form.value.clientId);
      },
      error: (e: any) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }

  monthName(m: number): string {
    return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][m - 1];
  }
}
