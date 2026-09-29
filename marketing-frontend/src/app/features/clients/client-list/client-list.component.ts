import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>🏢 Clients</h1>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Nouveau client
        </button>
      </div>

      <table mat-table [dataSource]="clients" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="companyName">
          <th mat-header-cell *matHeaderCellDef>Entreprise</th>
          <td mat-cell *matCellDef="let c">{{ c.companyName }}</td>
        </ng-container>
        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef>Téléphone</th>
          <td mat-cell *matCellDef="let c">{{ c.phone || '—' }}</td>
        </ng-container>
        <ng-container matColumnDef="contract">
          <th mat-header-cell *matHeaderCellDef>Contrat</th>
          <td mat-cell *matCellDef="let c">
            {{ c.contractStart || '?' }} → {{ c.contractEnd || '?' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="monthlyPrice">
          <th mat-header-cell *matHeaderCellDef>Prix/mois</th>
          <td mat-cell *matCellDef="let c">{{ c.monthlyPrice || 0 }} DH</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let c">
            <button mat-icon-button [routerLink]="['/clients', c.id]" title="Détail">
              <mat-icon>visibility</mat-icon>
            </button>
            <button mat-icon-button (click)="openForm(c)" title="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="remove(c.id!)" title="Supprimer">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <p *ngIf="clients.length === 0" class="empty">Aucun client pour le moment.</p>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    h1 { color: #1e293b; }
    .full-width { width: 100%; background: white; }
    .empty { text-align: center; color: #94a3b8; padding: 40px; }
  `]
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns = ['companyName', 'phone', 'contract', 'monthlyPrice', 'actions'];

  constructor(
    private service: ClientService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe(data => this.clients = data);
  }

  openForm(client?: Client): void {
    const ref = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: client || null
    });
    ref.afterClosed().subscribe(ok => { if (ok) this.load(); });
  }

  remove(id: number): void {
    if (!confirm('Supprimer ce client ?')) return;
    this.service.delete(id).subscribe({
      next: () => { this.snack.open('Client supprimé', '', { duration: 2000 }); this.load(); },
      error: () => this.snack.open('Erreur suppression', 'Fermer', { duration: 3000 })
    });
  }
}
