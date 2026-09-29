import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentService } from '../../../core/services/content.service';
import { ClientService } from '../../../core/services/client.service';
import { Content } from '../../../core/models/content.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Modifier' : 'Nouveau' }} contenu</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form">
        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <mat-select formControlName="clientId">
            <mat-option *ngFor="let c of clients" [value]="c.id">{{ c.companyName }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Titre</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type">
            <mat-option value="POST">Post</mat-option>
            <mat-option value="VIDEO">Vidéo</mat-option>
            <mat-option value="STORY">Story</mat-option>
            <mat-option value="REEL">Reel</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Date planifiée</mat-label>
          <input matInput type="datetime-local" formControlName="scheduledDate">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">
        Enregistrer
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.form { display: flex; flex-direction: column; gap: 12px; padding-top: 12px; }`]
})
export class ContentFormComponent implements OnInit {
  isEdit = false;
  clients: Client[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ContentService,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ContentFormComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Content | null
  ) {
    this.form = this.fb.group({
      clientId: [null as number | null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      type: ['POST', Validators.required],
      scheduledDate: ['']
    });

    if (data) {
      this.isEdit = true;
      this.form.patchValue({
        clientId: data.client?.id ?? data.clientId ?? null,
        title: data.title,
        description: data.description ?? '',
        type: data.type,
        scheduledDate: data.scheduledDate ?? ''
      });
    }
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(c => this.clients = c);
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
