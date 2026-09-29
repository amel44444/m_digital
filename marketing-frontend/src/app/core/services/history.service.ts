import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { History } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(private api: ApiService) {}

  getAll(): Observable<History[]> { return this.api.get<History[]>('history'); }
  getByUser(userId: number): Observable<History[]> {
    return this.api.get<History[]>(`history/user/${userId}`);
  }
  getByEntity(type: string, id: number): Observable<History[]> {
    return this.api.get<History[]>('history/entity', { type, id });
  }
}
