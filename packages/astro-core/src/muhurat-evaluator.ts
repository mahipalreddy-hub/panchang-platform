import { MuhuratCategory, MuhuratEvent, MuhuratWindow, MuhuratQueryParams } from '@panchang/types';
import { calculatePanchang } from './panchang-calculator';

export const MUHURAT_EVENTS_CATALOG: Record<MuhuratCategory, Omit<MuhuratEvent, 'upcomingWindows'>> = {
  wedding: {
    id: 'vivah-muhurat',
    category: 'wedding',
    title: 'Vivah / Wedding Muhurat',
    titleDevanagari: 'विवाह शुभ मुहूर्त',
    shortDescription: 'Find divine and astrologically certified auspicious wedding dates and Lagna timings.',
    fullGuide: 'Marriage (Vivah Sanskar) is one of the 16 sacred Vedic rites. Auspicious marriage dates require Shubh Tithis, fixed or soft Nakshatras, and complete avoidance of Guru/Shukra Astha, Bhadra, and Rahu Kalam.',
    primaryRules: [
      'Auspicious Nakshatras: Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha, Uttara Ashadha, Uttara Bhadrapada, Revati',
      'Favorable Tithis: 2, 3, 5, 7, 10, 11, 13 (Shukla and select Krishna paksha)',
      'Auspicious Days: Monday, Wednesday, Thursday, Friday'
    ],
    avoidances: [
      'Strictly avoid Chaturthi (4), Ashtami (8), Navami (9), Chaturdashi (14), and Amavasya (30)',
      'Avoid periods during Jupiter (Guru) or Venus (Shukra) combustion',
      'Avoid Bhadra (Vishti Karana), Solar/Lunar Eclipses, and Holashtak'
    ]
  },
  'griha-pravesh': {
    id: 'griha-pravesh-muhurat',
    category: 'griha-pravesh',
    title: 'Griha Pravesh / House Warming Muhurat',
    titleDevanagari: 'गृह प्रवेश मुहूर्त',
    shortDescription: 'Auspicious timing to enter a new or renovated house for boundless prosperity and peace.',
    fullGuide: 'Entering a new residence requires alignment with Vastu Purusha and favorable planetary transits.',
    primaryRules: [
      'Best Lunar Months: Magha, Phalguna, Vaishakha, Jyeshtha',
      'Best Nakshatras: Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, Uttara Ashadha, Uttara Bhadrapada, Revati',
      'Best Tithis: Shukla Paksha 2, 3, 5, 7, 10, 11, 12, 13'
    ],
    avoidances: [
      'Avoid Tuesday and Sunday',
      'Avoid Amavasya, Rikta tithis, and Pitru Paksha',
      'Avoid during combustion of Venus and Jupiter'
    ]
  },
  'vehicle-purchase': {
    id: 'vehicle-purchase-muhurat',
    category: 'vehicle-purchase',
    title: 'Vehicle Purchase Muhurat',
    titleDevanagari: 'वाहन क्रय शुभ मुहूर्त',
    shortDescription: 'Best days to buy cars, bikes, and commercial vehicles for safe travel and longevity.',
    fullGuide: 'Vehicles symbolize movement and mechanical energy, governed primarily by Venus and Mars.',
    primaryRules: [
      'Best Nakshatras: Swati, Punarvasu, Dhanishta, Shatabhisha, Ashwini, Revati, Hasta',
      'Best Days: Monday, Wednesday, Thursday, Friday, Sunday',
      'Best Choghadiyas: Amrit, Shubh, Labh, Char'
    ],
    avoidances: [
      'Avoid purchases during Rahu Kalam and Gulika Kalam',
      'Avoid Amavasya and Ardra Nakshatra',
      'Avoid during Bhadra'
    ]
  },
  'property-purchase': {
    id: 'property-purchase-muhurat',
    category: 'property-purchase',
    title: 'Property & Land Registration Muhurat',
    titleDevanagari: 'संपत्ति / भूमि क्रय मुहूर्त',
    shortDescription: 'Auspicious timing for signing land deeds, registry, and real estate purchases.',
    fullGuide: 'Bhumi (Earth) is ruled by Mars and Lord Varaha.',
    primaryRules: [
      'Best Days: Thursday and Friday for signing sale deeds',
      'Best Yogas: Sarvartha Siddhi Yoga, Amrit Siddhi Yoga',
      'Favorable Tithis: Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi'
    ],
    avoidances: [
      'Avoid Tuesday and Saturday for key agreements',
      'Avoid Vishti Karana (Bhadra)'
    ]
  },
  'business-opening': {
    id: 'business-opening-muhurat',
    category: 'business-opening',
    title: 'Business Opening / Shop Inauguration Muhurat',
    titleDevanagari: 'व्यापार आरंभ / दुकान उद्घाटन मुहूर्त',
    shortDescription: 'Astrologically optimal windows to start new commercial ventures and offices.',
    fullGuide: 'Mercantile endeavors require strong Mercury and Jupiter.',
    primaryRules: [
      'Best Nakshatras: Pushya, Ashwini, Rohini, Uttara Phalguni, Hasta, Chitra, Anuradha, Revati',
      'Best Days: Wednesday, Thursday, Friday',
      'Best Choghadiyas: Labh & Amrit'
    ],
    avoidances: [
      'Avoid Rahu Kalam and Yamaganda',
      'Avoid Rikta tithis'
    ]
  },
  namakaran: {
    id: 'namakaran-muhurat',
    category: 'namakaran',
    title: 'Namakaran / Naming Ceremony Muhurat',
    titleDevanagari: 'नामकरण संस्कार मुहूर्त',
    shortDescription: 'Auspicious timing for the sacred Vedic naming ceremony of a newborn baby.',
    fullGuide: 'Namakaran Sanskar connects the child to the cosmic vibrational frequency of their birth Nakshatra pada.',
    primaryRules: [
      'Best Days: Monday, Wednesday, Thursday, Friday',
      'Best Tithis: 1, 2, 3, 5, 7, 10, 11, 12, 13'
    ],
    avoidances: [
      'Avoid Rikta Tithis (4, 9, 14) and Amavasya (30)',
      'Avoid Sankranti days'
    ]
  },
  mundan: {
    id: 'mundan-muhurat',
    category: 'mundan',
    title: 'Mundan / Tonsure Ceremony Muhurat',
    titleDevanagari: 'मुंडन संस्कार मुहूर्त',
    shortDescription: 'Traditional head shaving ceremony timing for infant health and spiritual purification.',
    fullGuide: 'Mundan cleanses the child of impressions from previous lives.',
    primaryRules: ['Best Months: Uttarayan', 'Best Days: Monday, Wednesday, Thursday, Friday'],
    avoidances: ['Avoid during Rahu Kalam', 'Avoid Saturday, Sunday, Tuesday']
  },
  vidyarambha: {
    id: 'vidyarambha-muhurat',
    category: 'vidyarambha',
    title: 'Vidyarambha / Education Start Muhurat',
    titleDevanagari: 'विद्यारंभ मुहूर्त',
    shortDescription: 'Auspicious day for initiating formal education, reading, and music learning.',
    fullGuide: 'Initiation of children into letters and sciences.',
    primaryRules: ['Best Days: Wednesday, Thursday, Friday'],
    avoidances: ['Avoid Amavasya and Rikta tithis']
  },
  annaprashan: {
    id: 'annaprashan-muhurat',
    category: 'annaprashan',
    title: 'Annaprashan / First Feeding Muhurat',
    titleDevanagari: 'अन्नप्राशन संस्कार मुहूर्त',
    shortDescription: 'First solid food feeding ceremony for infant nourishment and longevity.',
    fullGuide: 'Performed in the 6th or 8th month for boys, 5th or 7th for girls.',
    primaryRules: ['Best Days: Monday, Wednesday, Thursday, Friday'],
    avoidances: ['Avoid during Rahu Kalam']
  },
  'ring-ceremony': {
    id: 'ring-ceremony-muhurat',
    category: 'ring-ceremony',
    title: 'Ring Ceremony / Engagement Muhurat',
    titleDevanagari: 'सगाई / मुद्रिका संस्कार मुहूर्त',
    shortDescription: 'Auspicious dates for engagement and matrimonial commitments.',
    fullGuide: 'Engagement establishes mutual promises under auspicious planetary hours.',
    primaryRules: ['Best Nakshatras: Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha'],
    avoidances: ['Avoid Rahu Kalam and Bhadra']
  }
};

export function findMuhuratWindows(params: MuhuratQueryParams): MuhuratWindow[] {
  const { type, city = 'delhi', from, to, limit = 10 } = params;
  const windows: MuhuratWindow[] = [];

  const startDate = new Date(from);
  const endDate = new Date(to);

  const curr = new Date(startDate);
  while (curr <= endDate && windows.length < limit) {
    const yyyy = curr.getFullYear();
    const mm = String(curr.getMonth() + 1).padStart(2, '0');
    const dd = String(curr.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const panchang = calculatePanchang(city, dateStr);

    let score = 70;
    const favorableFactors: string[] = [];
    const cautions: string[] = [];

    if (panchang.tithi.auspiciousness === 'auspicious') {
      score += 15;
      favorableFactors.push(`Auspicious ${panchang.tithi.name} (${panchang.tithi.paksha} Paksha)`);
    } else if (panchang.tithi.auspiciousness === 'inauspicious') {
      score -= 30;
      cautions.push(`Rikta or inauspicious tithi: ${panchang.tithi.name}`);
    }

    if (panchang.nakshatra.auspiciousness === 'auspicious') {
      score += 15;
      favorableFactors.push(`Favorable Nakshatra: ${panchang.nakshatra.name} (Lord: ${panchang.nakshatra.ruler})`);
    } else {
      score -= 10;
      cautions.push(`Nakshatra ${panchang.nakshatra.name} requires careful time selection`);
    }

    if (panchang.karana.isBhadra) {
      score -= 25;
      cautions.push(`Vishti Karana (Bhadra active)`);
    } else {
      favorableFactors.push(`Bhadra free day`);
    }

    if (panchang.auspicious.sarvarthaSiddhiYoga) {
      score += 10;
      favorableFactors.push('Sarvartha Siddhi Yoga is active');
    }
    if (panchang.auspicious.amritSiddhiYoga) {
      score += 10;
      favorableFactors.push('Amrit Siddhi Yoga is active');
    }

    score = Math.max(10, Math.min(98, score));

    if (score >= 60) {
      const auspiciousnessCategory = score >= 85 ? 'highly-auspicious' : score >= 70 ? 'auspicious' : 'moderate';
      const bestSlot = panchang.auspicious.abhijitMuhurat;

      windows.push({
        date: dateStr,
        dayOfWeek: panchang.dayOfWeek,
        startTime: bestSlot.start,
        endTime: bestSlot.end,
        durationFormatted: bestSlot.formattedDuration || '48 mins',
        score,
        auspiciousness: auspiciousnessCategory,
        tithi: `${panchang.tithi.name} (${panchang.tithi.paksha})`,
        nakshatra: panchang.nakshatra.name,
        favorableFactors,
        cautions,
        description: `Favorable time window for ${params.type.replace('-', ' ')} in ${panchang.cityName}. Favorable alignment of ${panchang.nakshatra.name} Nakshatra with ${panchang.tithi.name}.`
      });
    }

    curr.setDate(curr.getDate() + 1);
  }

  return windows;
}

export function getMuhuratEventDetails(category: MuhuratCategory, city: string = 'delhi', fromDate?: string): MuhuratEvent {
  const baseInfo = MUHURAT_EVENTS_CATALOG[category] || MUHURAT_EVENTS_CATALOG['wedding'];
  
  const from = fromDate || new Date().toISOString().split('T')[0];
  const toDateObj = new Date(from);
  toDateObj.setDate(toDateObj.getDate() + 90);
  const to = toDateObj.toISOString().split('T')[0];

  const upcomingWindows = findMuhuratWindows({
    type: category,
    city,
    from,
    to,
    limit: 12
  });

  return {
    ...baseInfo,
    upcomingWindows
  };
}