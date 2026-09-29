export type ContentType = 'POST' | 'VIDEO' | 'STORY' | 'REEL';
export type ContentStatus = 'DRAFT' | 'REVIEW' | 'SECURED' | 'PUBLISHED';

export interface Content {
  id?: number;
  client?: any;
  clientId?: number;
  title: string;
  description?: string;
  type: ContentType;
  fileUrl?: string;
  status?: ContentStatus;
  scheduledDate?: string;
  publishedDate?: string;
  createdAt?: string;
}

export interface ContentDTO {
  clientId: number;
  title: string;
  description?: string;
  type: ContentType;
  fileUrl?: string;
  scheduledDate?: string;
}
