import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Modifier' : 'Nouveau' }} client</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>ID utilisateur</mat-label>
          <input matInput type="number" formControlName="userId">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Nom de l'entreprise</mat-label>
          <input matInput formControlName="companyName">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Téléphone</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Début contrat</mat-label>
          <input matInput type="date" formControlName="contractStart">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Fin contrat</mat-label>
          <input matInput type="date" formControlName="contractEnd">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Prix mensuel (DH)</mat-label>
          <input matInput type="number" formControlName="monthlyPrice">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">
        {{ isEdit ? 'Enregistrer' : 'Créer' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-top: 12px; }
    @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  `]
})
export class ClientFormComponent {
  isEdit = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ClientService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Client | null
  ) {
    this.form = this.fb.group({
      userId: [null as number | null, Validators.required],
      companyName: ['', Validators.required],
      phone: [''],
      contractStart: [''],
      contractEnd: [''],
      monthlyPrice: [0]
    });

    if (data) {
      this.isEdit = true;
      this.form.patchValue({
        userId: data.user?.id ?? null,
        companyName: data.companyName,
        phone: data.phone ?? '',
        contractStart: data.contractStart ?? '',
        contractEnd: data.contractEnd ?? '',
        monthlyPrice: data.monthlyPrice ?? 0
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const payload = this.form.value;
    const obs = this.isEdit && this.data?.id
      ? this.service.update(this.data.id, payload)
      : this.service.create(payload);
    obs.subscribe({
      next: () => {
        this.snack.open('Enregistré ✅', '', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (e: any) => this.snack.open(e.error?.message || 'Erreur', 'Fermer', { duration: 3000 })
    });
  }
}
