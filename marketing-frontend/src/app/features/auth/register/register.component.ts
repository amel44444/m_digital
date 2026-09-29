import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <h1>📝 Créer un compte</h1>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Nom d'utilisateur</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Nom complet</mat-label>
            <input matInput formControlName="fullName">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password" type="password">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Rôle</mat-label>
            <mat-select formControlName="role">
              <mat-option value="CLIENT">Client</mat-option>
              <mat-option value="CM">Community Manager</mat-option>
              <mat-option value="ADMIN">Administrateur</mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-raised-button color="primary" class="full" type="submit"
                  [disabled]="form.invalid || loading">
            {{ loading ? 'Inscription...' : "S'inscrire" }}
          </button>

          <p class="link">
            Déjà un compte ? <a routerLink="/login">Se connecter</a>
          </p>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #1e293b, #3b82f6); padding: 24px; }
    .auth-card { width: 400px; padding: 32px; }
    .full { width: 100%; }
    .link { text-align: center; margin-top: 16px; color: #64748b; }
    .link a { color: #3b82f6; text-decoration: none; }
  `]
})
export class RegisterComponent {
  loading = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT' as Role]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.snack.open('Compte créé ✅', '', { duration: 2500 });
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Erreur', 'Fermer', { duration: 4000 });
      }
    });
  }
}
