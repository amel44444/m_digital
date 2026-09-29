import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentService } from '../../../core/services/content.service';
import { Content } from '../../../core/models/content.model';
import { ContentFormComponent } from '../content-form/content-form.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatChipsModule, MatSnackBarModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>📝 Contenus / Capsules</h1>
        <button mat-raised-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Nouveau contenu
        </button>
      </div>

      <table mat-table [dataSource]="contents" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Titre</th>
          <td mat-cell *matCellDef="let c">{{ c.title }}</td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let c">
            <mat-chip [highlighted]="true">{{ c.type }}</mat-chip>
          </td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let c">
            <span class="badge" [ngClass]="c.status?.toLowerCase()">{{ c.status }}</span>
          </td>
        </ng-container>
        <ng-container matColumnDef="scheduledDate">
          <th mat-header-cell *matHeaderCellDef>Planifié</th>
          <td mat-cell *matCellDef="let c">{{ c.scheduledDate ? (c.scheduledDate | date:'short') : '—' }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let c">
            <button mat-icon-button (click)="secure(c)" title="Sécuriser" *ngIf="c.status === 'DRAFT' || c.status === 'REVIEW'">
              <mat-icon>lock</mat-icon>
            </button>
            <button mat-icon-button color="primary" (click)="publish(c)" title="Publier" *ngIf="c.status === 'SECURED'">
              <mat-icon>rocket_launch</mat-icon>
            </button>
            <button mat-icon-button (click)="openForm(c)" title="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="remove(c.id!)" title="Supprimer">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols"></tr>
      </table>

      <p *ngIf="contents.length === 0" class="empty">Aucun contenu pour le moment.</p>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    h1 { color: #1e293b; }
    .full-width { width: 100%; background: white; }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.draft { background: #f1f5f9; color: #475569; }
    .badge.review { background: #fef3c7; color: #92400e; }
    .badge.secured { background: #dbeafe; color: #1e40af; }
    .badge.published { background: #d1fae5; color: #065f46; }
    .empty { text-align: center; color: #94a3b8; padding: 40px; }
  `]
})
export class ContentListComponent implements OnInit {
  contents: Content[] = [];
  cols = ['title', 'type', 'status', 'scheduledDate', 'actions'];

  constructor(
    private service: ContentService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.service.getAll().subscribe(d => this.contents = d); }

  openForm(content?: Content): void {
    const ref = this.dialog.open(ContentFormComponent, { width: '600px', data: content || null });
    ref.afterClosed().subscribe(ok => { if (ok) this.load(); });
  }

  secure(c: Content): void {
    if (!c.id) return;
    this.service.secure(c.id).subscribe({
      next: () => { this.snack.open('🔐 Contenu sécurisé', '', { duration: 2000 }); this.load(); },
      error: (e) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }

  publish(c: Content): void {
    if (!c.id) return;
    this.service.publish(c.id).subscribe({
      next: () => { this.snack.open('🚀 Contenu publié', '', { duration: 2000 }); this.load(); },
      error: (e) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }

  remove(id: number): void {
    if (!confirm('Supprimer ce contenu ?')) return;
    this.service.delete(id).subscribe(() => { this.snack.open('Supprimé', '', { duration: 2000 }); this.load(); });
  }
}
