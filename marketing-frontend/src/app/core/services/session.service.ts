import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SessionSeance, SessionDTO } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private api: ApiService) {}

  getAll(): Observable<SessionSeance[]> { return this.api.get<SessionSeance[]>('sessions'); }
  getByClient(clientId: number): Observable<SessionSeance[]> {
    return this.api.get<SessionSeance[]>(`sessions/client/${clientId}`);
  }
  create(dto: SessionDTO): Observable<SessionSeance> {
    return this.api.post<SessionSeance>('sessions', dto);
  }
  markDone(id: number): Observable<SessionSeance> {
    return this.api.post<SessionSeance>(`sessions/${id}/done`, {});
  }
  countDone(clientId: number, month: number, year: number): Observable<number> {
    return this.api.get<number>(`sessions/client/${clientId}/count`, { month, year });
  }
  delete(id: number): Observable<void> { return this.api.delete<void>(`sessions/${id}`); }
}
