export interface CityConfig {
  slug: string;
  name: string;
  nameDevanagari: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string; // "Asia/Kolkata"
  elevationMeters: number;
  isMajorHub: boolean;
  popularKeywords: string[];
}