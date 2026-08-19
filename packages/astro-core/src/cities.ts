import { CityConfig } from '@panchang/types';

export const INDIAN_CITIES: CityConfig[] = [
  { slug: 'delhi', name: 'New Delhi', nameDevanagari: 'नई दिल्ली', state: 'Delhi', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata', elevationMeters: 216, isMajorHub: true, popularKeywords: ['delhi panchang', 'delhi rahu kalam', 'delhi muhurat'] },
  { slug: 'mumbai', name: 'Mumbai', nameDevanagari: 'मुंबई', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', elevationMeters: 14, isMajorHub: true, popularKeywords: ['mumbai panchang', 'mumbai tithi', 'bombay panchang'] },
  { slug: 'bengaluru', name: 'Bengaluru', nameDevanagari: 'बेंगलुरु', state: 'Karnataka', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', elevationMeters: 920, isMajorHub: true, popularKeywords: ['bangalore panchang', 'bangalore rahu kalam', 'kannada panchang'] },
  { slug: 'hyderabad', name: 'Hyderabad', nameDevanagari: 'हैदराबाद', state: 'Telangana', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata', elevationMeters: 542, isMajorHub: true, popularKeywords: ['hyderabad panchang', 'telugu panchangam', 'hyderabad rahu kalam'] },
  { slug: 'chennai', name: 'Chennai', nameDevanagari: 'चेन्नई', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata', elevationMeters: 6, isMajorHub: true, popularKeywords: ['chennai panchangam', 'tamil panchangam', 'chennai rahu kalam'] },
  { slug: 'kolkata', name: 'Kolkata', nameDevanagari: 'कोलकाता', state: 'West Bengal', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata', elevationMeters: 9, isMajorHub: true, popularKeywords: ['kolkata panjika', 'bengali panjika', 'kolkata tithi'] },
  { slug: 'pune', name: 'Pune', nameDevanagari: 'पुणे', state: 'Maharashtra', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata', elevationMeters: 560, isMajorHub: true, popularKeywords: ['pune panchang', 'marathi panchang', 'pune muhurat'] },
  { slug: 'ahmedabad', name: 'Ahmedabad', nameDevanagari: 'अहमदाबाद', state: 'Gujarat', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata', elevationMeters: 53, isMajorHub: true, popularKeywords: ['gujarati panchang', 'ahmedabad choghadiya', 'ahmedabad panchang'] },
  { slug: 'jaipur', name: 'Jaipur', nameDevanagari: 'जयपुर', state: 'Rajasthan', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata', elevationMeters: 431, isMajorHub: true, popularKeywords: ['jaipur panchang', 'rajasthan panchang', 'jaipur muhurat'] },
  { slug: 'varanasi', name: 'Varanasi', nameDevanagari: 'वाराणसी (काशी)', state: 'Uttar Pradesh', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata', elevationMeters: 80, isMajorHub: true, popularKeywords: ['kashi panchang', 'varanasi panchang', 'hishikesh panchang'] },
  { slug: 'lucknow', name: 'Lucknow', nameDevanagari: 'लखनऊ', state: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata', elevationMeters: 123, isMajorHub: true, popularKeywords: ['lucknow panchang', 'up panchang', 'lucknow tithi'] },
  { slug: 'patna', name: 'Patna', nameDevanagari: 'पटना', state: 'Bihar', latitude: 25.5941, longitude: 85.1376, timezone: 'Asia/Kolkata', elevationMeters: 53, isMajorHub: false, popularKeywords: ['bihar panchang', 'patna panchang', 'chhath puja timings'] },
  { slug: 'ujjain', name: 'Ujjain', nameDevanagari: 'उज्जैन', state: 'Madhya Pradesh', latitude: 23.1765, longitude: 75.7885, timezone: 'Asia/Kolkata', elevationMeters: 494, isMajorHub: true, popularKeywords: ['ujjain panchang', 'mahakal panchang', 'vedic time center'] },
  { slug: 'haridwar', name: 'Haridwar', nameDevanagari: 'हरिद्वार', state: 'Uttarakhand', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata', elevationMeters: 314, isMajorHub: false, popularKeywords: ['haridwar panchang', 'ganga aarti time', 'haridwar muhurat'] },
  { slug: 'tirupati', name: 'Tirupati', nameDevanagari: 'तिरुपति', state: 'Andhra Pradesh', latitude: 13.6288, longitude: 79.4192, timezone: 'Asia/Kolkata', elevationMeters: 161, isMajorHub: false, popularKeywords: ['tirupati panchangam', 'balaji darshan muhurat'] }
];

export function getCityBySlug(slug: string): CityConfig {
  const normalized = (slug || '').toLowerCase().trim();
  const found = INDIAN_CITIES.find(c => c.slug === normalized);
  if (found) return found;
  return INDIAN_CITIES[0];
}