import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <div class="auth-header">
          <h1>🎯 CM Platform</h1>
          <p>Connectez-vous à votre espace</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="admin@cm.com">
            <mat-error *ngIf="form.get('email')?.invalid">Email invalide</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error *ngIf="form.get('password')?.invalid">Mot de passe requis</mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" class="full" type="submit"
                  [disabled]="form.invalid || loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>

          <p class="link">
            Pas de compte ? <a routerLink="/register">S'inscrire</a>
          </p>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #1e293b, #3b82f6); }
    .auth-card { width: 400px; padding: 32px; }
    .auth-header { text-align: center; margin-bottom: 24px; }
    .auth-header h1 { margin: 0; color: #1e293b; }
    .auth-header p { color: #64748b; margin-top: 4px; }
    .full { width: 100%; }
    button.full { height: 48px; margin-top: 8px; }
    .link { text-align: center; margin-top: 16px; color: #64748b; }
    .link a { color: #3b82f6; text-decoration: none; }
  `]
})
export class LoginComponent {
  loading = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.snack.open('Connexion réussie ✅', '', { duration: 2500 });
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Échec de connexion', 'Fermer', { duration: 4000 });
      }
    });
  }
}
