import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Statistic, StatisticDTO } from '../models/statistic.model';

@Injectable({ providedIn: 'root' })
export class StatisticService {
  constructor(private api: ApiService) {}

  getByContent(contentId: number): Observable<Statistic[]> {
    return this.api.get<Statistic[]>(`statistics/content/${contentId}`);
  }
  create(dto: StatisticDTO): Observable<Statistic> {
    return this.api.post<Statistic>('statistics', dto);
  }
  getTotals(clientId: number): Observable<any[]> {
    return this.api.get<any[]>(`statistics/client/${clientId}/totals`);
  }
}
