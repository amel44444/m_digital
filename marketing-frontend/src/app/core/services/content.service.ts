import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Content, ContentDTO, ContentStatus } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Content[]> { return this.api.get<Content[]>('contents'); }
  getById(id: number): Observable<Content> { return this.api.get<Content>(`contents/${id}`); }
  getByClient(clientId: number): Observable<Content[]> {
    return this.api.get<Content[]>(`contents/client/${clientId}`);
  }
  create(dto: ContentDTO): Observable<Content> { return this.api.post<Content>('contents', dto); }
  update(id: number, dto: ContentDTO): Observable<Content> {
    return this.api.put<Content>(`contents/${id}`, dto);
  }
  uploadFile(id: number, file: File): Observable<Content> {
    return this.api.upload<Content>(`contents/${id}/upload`, file);
  }
  secure(id: number): Observable<Content> {
    return this.api.post<Content>(`contents/${id}/secure`, {});
  }
  publish(id: number): Observable<Content> {
    return this.api.post<Content>(`contents/${id}/publish`, {});
  }
  changeStatus(id: number, status: ContentStatus): Observable<Content> {
    return this.api.patch<Content>(`contents/${id}/status?status=${status}`, {});
  }
  delete(id: number): Observable<void> { return this.api.delete<void>(`contents/${id}`); }
}
