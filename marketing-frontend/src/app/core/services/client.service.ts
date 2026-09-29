import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Client, ClientDTO } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {

  constructor(private api: ApiService) {}

  /**
   * Récupère la liste de tous les clients
   * → GET /api/clients
   */
  getAll(): Observable<Client[]> {
    return this.api.get<Client[]>('clients');
  }

  /**
   * Récupère un client par son ID
   * → GET /api/clients/{id}
   */
  getById(id: number): Observable<Client> {
    return this.api.get<Client>(`clients/${id}`);
  }

  /**
   * Crée un nouveau client
   * → POST /api/clients
   */
  create(dto: ClientDTO): Observable<Client> {
    return this.api.post<Client>('clients', dto);
  }

  /**
   * Met à jour un client existant
   * → PUT /api/clients/{id}
   */
  update(id: number, dto: ClientDTO): Observable<Client> {
    return this.api.put<Client>(`clients/${id}`, dto);
  }

  /**
   * Supprime un client
   * → DELETE /api/clients/{id}
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`clients/${id}`);
  }
}
