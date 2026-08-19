export type MuhuratCategory = 
  | 'wedding'           // Vivah
  | 'griha-pravesh'     // House Warming
  | 'vehicle-purchase'  // Vahan Kharid
  | 'property-purchase' // Sampatti Kharid
  | 'namakaran'         // Naming Ceremony
  | 'mundan'            // Tonsure Ceremony
  | 'business-opening'  // Vyapar Aarambh
  | 'vidyarambha'       // Education Start
  | 'annaprashan'       // First Solid Food
  | 'ring-ceremony';    // Sagai / Engagement

export interface MuhuratWindow {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  startTime: string; // "10:15 AM"
  endTime: string;   // "01:45 PM"
  durationFormatted: string;
  score: number; // 0 to 100
  auspiciousness: 'highly-auspicious' | 'auspicious' | 'moderate';
  tithi: string;
  nakshatra: string;
  favorableFactors: string[];
  cautions: string[];
  description: string;
}

export interface MuhuratEvent {
  id: string;
  category: MuhuratCategory;
  title: string;
  titleDevanagari: string;
  shortDescription: string;
  fullGuide: string;
  primaryRules: string[];
  avoidances: string[];
  upcomingWindows: MuhuratWindow[];
}

export interface MuhuratQueryParams {
  type: MuhuratCategory;
  city?: string;
  from: string; // YYYY-MM-DD
  to: string;   // YYYY-MM-DD
  limit?: number;
}