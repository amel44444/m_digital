export interface History {
  id?: number;
  user?: { id: number; email: string; fullName?: string };
  action: string;
  entityType: string;
  entityId: number;
  details?: string;
  createdAt?: string;
}
