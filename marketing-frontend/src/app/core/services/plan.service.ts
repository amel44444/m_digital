import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommunicationPlan, PlanDTO } from '../models/plan.model';

@Injectable({ providedIn: 'root' })
export class PlanService {
  constructor(private api: ApiService) {}

  getByClient(clientId: number): Observable<CommunicationPlan[]> {
    return this.api.get<CommunicationPlan[]>(`plans/client/${clientId}`);
  }
  create(dto: PlanDTO): Observable<CommunicationPlan> {
    return this.api.post<CommunicationPlan>('plans', dto);
  }
  update(id: number, dto: PlanDTO): Observable<CommunicationPlan> {
    return this.api.put<CommunicationPlan>(`plans/${id}`, dto);
  }
}
