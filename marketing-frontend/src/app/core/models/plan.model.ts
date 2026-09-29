export interface CommunicationPlan {
  id?: number;
  client?: any;
  clientId?: number;
  month: number;
  year: number;
  objectives?: string;
  themes?: string;
  targetAudience?: string;
}

export interface PlanDTO {
  clientId: number;
  month: number;
  year: number;
  objectives?: string;
  themes?: string;
  targetAudience?: string;
}
