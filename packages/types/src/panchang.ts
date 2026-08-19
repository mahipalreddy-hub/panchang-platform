export interface TimeInterval {
  start: string; // e.g. "06:12 AM" or "2026-08-19T06:12:00+05:30"
  end: string;   // e.g. "07:45 AM" or "2026-08-19T07:45:00+05:30"
  formattedDuration?: string;
}

export interface TithiInfo {
  id: number;
  name: string;
  nameDevanagari: string;
  paksha: 'Shukla' | 'Krishna';
  pakshaDevanagari: string;
  number: number; // 1 to 15
  startTime: string;
  endTime: string;
  nextTithi?: {
    name: string;
    nameDevanagari: string;
    endTime: string;
  };
  deity: string;
  auspiciousness: 'auspicious' | 'inauspicious' | 'neutral';
  description: string;
}

export interface NakshatraInfo {
  id: number;
  name: string;
  nameDevanagari: string;
  number: number; // 1 to 27
  pada: number; // 1 to 4
  startTime: string;
  endTime: string;
  nextNakshatra?: {
    name: string;
    nameDevanagari: string;
    endTime: string;
  };
  ruler: string; // Lord e.g. "Ketu", "Venus", "Sun"
  deity: string;
  symbol: string;
  auspiciousness: 'auspicious' | 'inauspicious' | 'neutral';
  description: string;
}

export interface YogaInfo {
  id: number;
  name: string;
  nameDevanagari: string;
  number: number; // 1 to 27
  startTime: string;
  endTime: string;
  auspiciousness: 'auspicious' | 'inauspicious' | 'neutral';
  meaning: string;
}

export interface KaranaInfo {
  id: number;
  name: string;
  nameDevanagari: string;
  number: number; // 1 to 60
  type: 'Chara' | 'Sthira'; // Movable or Fixed
  startTime: string;
  endTime: string;
  isBhadra: boolean; // Crucial for muhurat avoidance (Vishti karana)
  auspiciousness: 'auspicious' | 'inauspicious' | 'neutral';
}

export interface SolarLunarTimes {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  dayLength: string;
  nightLength: string;
  sunSign: string;
  sunSignDevanagari: string;
  moonSign: string;
  moonSignDevanagari: string;
  solarMonth: string;
  lunarMonthPurnimanta: string;
  lunarMonthAmanta: string;
  ritu: string; // Season (Vasant, Grishma, Varsha, Sharad, Hemant, Shishir)
  ayana: 'Uttarayan' | 'Dakshinayan';
  samvatsara: string; // Vikram Samvat name (e.g. Pingala, Kalayukta)
  vikramSamvat: number;
  shakaSamvat: number;
}

export interface InauspiciousTimings {
  rahuKalam: TimeInterval;
  yamaganda: TimeInterval;
  gulikaKalam: TimeInterval;
  durMuhurat: TimeInterval[];
  varjyam: TimeInterval[];
  bhadra?: TimeInterval;
  gandMool?: boolean;
}

export interface AuspiciousTimings {
  abhijitMuhurat: TimeInterval;
  amritKalam: TimeInterval[];
  brahmaMuhurat: TimeInterval;
  vijayaMuhurat: TimeInterval;
  godhuliMuhurat: TimeInterval;
  sandhyaPratah: TimeInterval;
  sandhyaSayahna: TimeInterval;
  amritSiddhiYoga?: boolean;
  sarvarthaSiddhiYoga?: boolean;
  dwiPushkarYoga?: boolean;
  tripushkarYoga?: boolean;
}

export interface ChoghadiyaSlot {
  name: string;
  nameDevanagari: string;
  type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg';
  quality: 'best' | 'good' | 'gain' | 'neutral' | 'inauspicious' | 'loss' | 'bad';
  ruler: string;
  start: string;
  end: string;
}

export interface ChoghadiyaTimings {
  day: ChoghadiyaSlot[];
  night: ChoghadiyaSlot[];
}

export interface PlanetPosition {
  name: string;
  nameDevanagari: string;
  sign: string;
  signDevanagari: string;
  degree: number;
  nakshatra: string;
  pada: number;
  isRetrograde: boolean;
  house?: number;
}

export interface PanchangData {
  id?: string | number;
  date: string; // YYYY-MM-DD
  city: string; // slug e.g. "hyderabad", "delhi"
  cityName: string; // display e.g. "Hyderabad", "New Delhi"
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  dayOfWeek: string;
  dayOfWeekDevanagari: string;
  solarLunar: SolarLunarTimes;
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana: KaranaInfo;
  inauspicious: InauspiciousTimings;
  auspicious: AuspiciousTimings;
  choghadiya: ChoghadiyaTimings;
  planetaryPositions?: PlanetPosition[];
  festivalsToday?: string[];
  vratToday?: string[];
  summaryNote?: string;
  meta: {
    generatedAt: string;
    source: string;
    version: string;
  };
}