import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HistoryService } from '../../core/services/history.service';
import { History } from '../../core/models/history.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  template: `
    <div class="page">
      <h1>📜 Historique des actions</h1>

      <table mat-table [dataSource]="items" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let h">{{ h.createdAt | date:'short' }}</td>
        </ng-container>
        <ng-container matColumnDef="user">
          <th mat-header-cell *matHeaderCellDef>Utilisateur</th>
          <td mat-cell *matCellDef="let h">{{ h.user?.fullName || h.user?.email || '—' }}</td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let h">
            <span class="badge">{{ h.action }}</span>
          </td>
        </ng-container>
        <ng-container matColumnDef="entityType">
          <th mat-header-cell *matHeaderCellDef>Entité</th>
          <td mat-cell *matCellDef="let h">{{ h.entityType }} #{{ h.entityId }}</td>
        </ng-container>
        <ng-container matColumnDef="details">
          <th mat-header-cell *matHeaderCellDef>Détails</th>
          <td mat-cell *matCellDef="let h">{{ h.details }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols"></tr>
      </table>

      <p *ngIf="items.length === 0" class="empty">Aucune action enregistrée.</p>
    </div>
  `,
  styles: [`
    h1 { color: #1e293b; margin-bottom: 20px; }
    .full-width { width: 100%; background: white; }
    .badge { background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
    .empty { text-align: center; color: #94a3b8; padding: 40px; }
  `]
})
export class HistoryComponent implements OnInit {
  items: History[] = [];
  cols = ['createdAt', 'user', 'action', 'entityType', 'details'];

  constructor(private service: HistoryService) {}

  ngOnInit(): void { this.service.getAll().subscribe(d => this.items = d); }
}
