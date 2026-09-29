import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Payment, PaymentDTO } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private api: ApiService) {}

  getByClient(clientId: number): Observable<Payment[]> {
    return this.api.get<Payment[]>(`payments/client/${clientId}`);
  }
  create(dto: PaymentDTO): Observable<Payment> {
    return this.api.post<Payment>('payments', dto);
  }
  markPaid(id: number): Observable<Payment> {
    return this.api.post<Payment>(`payments/${id}/pay`, {});
  }
}
