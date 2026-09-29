export interface Statistic {
  id?: number;
  contentId: number;
  content?: any;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  recordedAt?: string;
}

export interface StatisticDTO {
  contentId: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface StatTotals {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}
