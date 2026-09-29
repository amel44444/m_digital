export type SessionStatus = 'PLANNED' | 'DONE' | 'CANCELLED';

export interface SessionSeance {
  id?: number;
  client?: any;
  clientId?: number;
  sessionDate: string;
  month: number;
  year: number;
  status?: SessionStatus;
  notes?: string;
}

export interface SessionDTO {
  clientId: number;
  sessionDate: string;
  month: number;
  year: number;
  notes?: string;
}
