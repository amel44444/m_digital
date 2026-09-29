import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatSnackBarModule],
  template: `
    <div class="page">
      <h1>👥 Utilisateurs</h1>
      <table mat-table [dataSource]="users" class="mat-elevation-z2 full-width">
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let u">{{ u.username }}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let u">{{ u.email }}</td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Rôle</th>
          <td mat-cell *matCellDef="let u"><span class="badge">{{ u.role }}</span></td>
        </ng-container>
        <ng-container matColumnDef="enabled">
          <th mat-header-cell *matHeaderCellDef>Actif</th>
          <td mat-cell *matCellDef="let u">
            <mat-slide-toggle [checked]="u.enabled" (change)="toggle(u, $event.checked)"></mat-slide-toggle>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let u">
            <button mat-icon-button color="warn" (click)="remove(u.id!)">
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
    .full-width { width: 100%; background: white; }
    .badge { background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  cols = ['username', 'email', 'role', 'enabled', 'actions'];

  constructor(private service: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.service.getAll().subscribe(d => this.users = d); }

  toggle(u: User, enabled: boolean): void {
    this.service.update(u.id!, { ...u, enabled }).subscribe(() => this.snack.open('Modifié', '', { duration: 1500 }));
  }

  remove(id: number): void {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
