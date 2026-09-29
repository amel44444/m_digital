import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentService } from '../../../core/services/payment.service';
import { ClientService } from '../../../core/services/client.service';
import { Payment } from '../../../core/models/payment.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCardModule, MatSnackBarModule
  ],
  template: `
    <div class="page">
      <h1>💰 Paiements mensuels</h1>

      <mat-card class="form-card">
        <h3>Créer un paiement</h3>
        <form [formGroup]="form" (ngSubmit)="create()" class="form-inline">
          <mat-form-field appearance="outline">
            <mat-label>Client</mat-label>
            <mat-select formControlName="clientId">
              <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Montant (DH)</mat-label>
            <input matInput type="number" formControlName="amount">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mois</mat-label>
            <input matInput type="number" formControlName="month" min="1" max="12">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Année</mat-label>
            <input matInput type="number" formControlName="year">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Créer</button>
        </form>
      </mat-card>

      <mat-form-field appearance="outline" style="width: 300px;">
        <mat-label>Filtrer par client</mat-label>
        <mat-select (selectionChange)="filterByClient($event.value)">
          <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
        </mat-select>
      </mat-form-field>

      <table mat-table [dataSource]="payments" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="client">
          <th mat-header-cell *matHeaderCellDef>Client</th>
          <td mat-cell *matCellDef="let p">{{ p.client?.companyName }}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Montant</th>
          <td mat-cell *matCellDef="let p">{{ p.amount }} DH</td>
        </ng-container>
        <ng-container matColumnDef="period">
          <th mat-header-cell *matHeaderCellDef>Période</th>
          <td mat-cell *matCellDef="let p">{{ p.month }}/{{ p.year }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let p">
            <span class="badge" [ngClass]="p.status?.toLowerCase()">{{ p.status }}</span>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let p">
            <button mat-raised-button color="primary" *ngIf="p.status === 'PENDING'" (click)="markPaid(p.id!)">
              Valider
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols"></tr>
      </table>
    </div>
  `,
  styles: [`
    h1 { color: #1e293b; margin-bottom: 20px; }
    .form-card { padding: 20px; margin-bottom: 20px; }
    .form-card h3 { margin: 0 0 12px; }
    .form-inline { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .full-width { width: 100%; background: white; margin-top: 16px; }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.pending { background: #fef3c7; color: #92400e; }
    .badge.paid { background: #d1fae5; color: #065f46; }
    .badge.overdue { background: #fee2e2; color: #991b1b; }
  `]
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  clients: Client[] = [];
  cols = ['client', 'amount', 'period', 'status', 'actions'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PaymentService,
    private clientService: ClientService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      clientId: [null as number | null, Validators.required],
      amount: [0, Validators.required],
      month: [new Date().getMonth() + 1, Validators.required],
      year: [new Date().getFullYear(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
  }

  filterByClient(clientId: number): void {
    if (!clientId) return;
    this.service.getByClient(clientId).subscribe(p => this.payments = p);
  }

  create(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.snack.open('Paiement créé', '', { duration: 2000 });
        this.filterByClient(this.form.value.clientId);
      },
      error: (e: any) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }

  markPaid(id: number): void {
    this.service.markPaid(id).subscribe(() => {
      this.snack.open('Paiement validé ✅', '', { duration: 2000 });
      this.filterByClient(this.form.value.clientId);
    });
  }
}
