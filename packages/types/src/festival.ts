export interface FestivalItem {
  id: string;
  slug: string;
  name: string;
  nameDevanagari: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  lunarMonth: string;
  paksha: 'Shukla' | 'Krishna';
  tithi: string;
  category: 'major' | 'vrat' | 'jayanti' | 'regional' | 'seasonal';
  significance: string;
  pujaMuhurat?: {
    start: string;
    end: string;
    description: string;
  };
  rituals: string[];
  regionalVariations?: {
    region: string;
    customName: string;
    customRitual: string;
  }[];
  contentSnippet: string;
  fullStoryUrl?: string;
}

export interface FestivalMonthGroup {
  monthName: string;
  year: number;
  festivals: FestivalItem[];
}