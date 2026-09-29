export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE';

export interface Payment {
  id?: number;
  client?: any;
  clientId?: number;
  amount: number;
  month: number;
  year: number;
  status?: PaymentStatus;
  paymentDate?: string;
}

export interface PaymentDTO {
  clientId: number;
  amount: number;
  month: number;
  year: number;
}
