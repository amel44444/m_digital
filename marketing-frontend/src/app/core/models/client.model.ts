export interface Client {
  id?: number;
  user?: { id: number; email: string; fullName?: string };
  companyName: string;
  phone?: string;
  contractStart?: string;
  contractEnd?: string;
  monthlyPrice?: number;
  createdAt?: string;
}

export interface ClientDTO {
  userId: number;
  companyName: string;
  phone?: string;
  contractStart?: string;
  contractEnd?: string;
  monthlyPrice?: number;
}
