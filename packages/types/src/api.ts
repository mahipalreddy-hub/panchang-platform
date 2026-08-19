import { PanchangData } from './panchang';
import { MuhuratWindow, MuhuratCategory } from './muhurat';
import { FestivalItem } from './festival';
import { CityConfig } from './city';
import { BlogPost } from './blog';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    cached?: boolean;
    serverTime?: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type PanchangApiResponse = ApiResponse<PanchangData>;
export type MuhuratApiResponse = ApiResponse<{
  category: MuhuratCategory;
  city: string;
  from: string;
  to: string;
  totalWindows: number;
  windows: MuhuratWindow[];
}>;
export type FestivalsApiResponse = ApiResponse<{
  year: number;
  festivals: FestivalItem[];
}>;
export type CitiesApiResponse = ApiResponse<CityConfig[]>;
export type BlogListApiResponse = ApiResponse<BlogPost[]>;
export type BlogPostApiResponse = ApiResponse<BlogPost>;