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
import { SessionService } from '../../../core/services/session.service';
import { ClientService } from '../../../core/services/client.service';
import { SessionSeance } from '../../../core/models/session.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCardModule, MatSnackBarModule
  ],
  template: `
    <div class="page">
      <h1>📅 Séances (4 par mois / client)</h1>

      <mat-card class="form-card">
        <h3>Planifier une séance</h3>
        <form [formGroup]="form" (ngSubmit)="create()" class="form-inline">
          <mat-form-field appearance="outline">
            <mat-label>Client</mat-label>
            <mat-select formControlName="clientId">
              <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Date</mat-label>
            <input matInput type="datetime-local" formControlName="sessionDate">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mois</mat-label>
            <input matInput type="number" formControlName="month" min="1" max="12">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Année</mat-label>
            <input matInput type="number" formControlName="year">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Ajouter</button>
        </form>
      </mat-card>

      <table mat-table [dataSource]="sessions" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="client">
          <th mat-header-cell *matHeaderCellDef>Client</th>
          <td mat-cell *matCellDef="let s">{{ s.client?.companyName }}</td>
        </ng-container>
        <ng-container matColumnDef="sessionDate">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let s">{{ s.sessionDate | date:'short' }}</td>
        </ng-container>
        <ng-container matColumnDef="period">
          <th mat-header-cell *matHeaderCellDef>Période</th>
          <td mat-cell *matCellDef="let s">{{ s.month }}/{{ s.year }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let s">
            <span class="badge" [ngClass]="s.status?.toLowerCase()">{{ s.status }}</span>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let s">
            <button mat-icon-button color="primary" (click)="markDone(s.id!)" *ngIf="s.status === 'PLANNED'">
              <mat-icon>check_circle</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="remove(s.id!)">
              <mat-icon>delete</mat-icon>
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
    .full-width { width: 100%; background: white; }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.planned { background: #fef3c7; color: #92400e; }
    .badge.done { background: #d1fae5; color: #065f46; }
    .badge.cancelled { background: #fee2e2; color: #991b1b; }
  `]
})
export class SessionListComponent implements OnInit {
  sessions: SessionSeance[] = [];
  clients: Client[] = [];
  cols = ['client', 'sessionDate', 'period', 'status', 'actions'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SessionService,
    private clientService: ClientService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      clientId: [null as number | null, Validators.required],
      sessionDate: ['', Validators.required],
      month: [new Date().getMonth() + 1, Validators.required],
      year: [new Date().getFullYear(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(d => this.sessions = d);
  }

  create(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.snack.open('Séance ajoutée ✅', '', { duration: 2000 });
        this.load();
      },
      error: (e: any) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }

  markDone(id: number): void {
    this.service.markDone(id).subscribe(() => {
      this.snack.open('Séance réalisée ✅', '', { duration: 2000 });
      this.load();
    });
  }

  remove(id: number): void {
    if (!confirm('Supprimer cette séance ?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
