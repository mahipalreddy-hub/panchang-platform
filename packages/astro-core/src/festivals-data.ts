import { FestivalItem } from '@panchang/types';

export const FESTIVALS_DATABASE: FestivalItem[] = [
  {
    id: 'maha-shivratri-2026',
    slug: 'maha-shivratri',
    name: 'Maha Shivratri',
    nameDevanagari: 'महाशिवरात्रि',
    date: '2026-02-16',
    dayOfWeek: 'Monday',
    lunarMonth: 'Phalguna',
    paksha: 'Krishna',
    tithi: 'Chaturdashi',
    category: 'major',
    significance: 'The great night of Lord Shiva celebrating the cosmic dance of creation and the divine union of Shiva and Shakti.',
    pujaMuhurat: {
      start: '11:45 PM',
      end: '12:35 AM',
      description: 'Nishita Kaal Puja Time'
    },
    rituals: ['All-night vigil (Jagran)', 'Maha Rudrabhishek with Bilva leaves, milk, and holy water', 'Maha Mrityunjaya Jaap'],
    regionalVariations: [
      { region: 'Kashmir', customName: 'Herath', customRitual: 'Vatuk Puja rituals with soaked walnuts' },
      { region: 'Varanasi', customName: 'Kashi Shivaratri', customRitual: 'Grand procession to Kashi Vishwanath Temple' }
    ],
    contentSnippet: 'Maha Shivratri is celebrated on the 14th day of the dark fortnight in Phalguna. Fasting and meditation invoke peace, inner awakening, and prosperity.'
  },
  {
    id: 'holi-2026',
    slug: 'holi',
    name: 'Holi (Dhulandi)',
    nameDevanagari: 'होली (धुलंडी)',
    date: '2026-03-04',
    dayOfWeek: 'Wednesday',
    lunarMonth: 'Phalguna',
    paksha: 'Shukla',
    tithi: 'Purnima',
    category: 'major',
    significance: 'The festival of colors celebrating the victory of Bhakta Prahlada over Holika and the divine love of Radha and Krishna.',
    pujaMuhurat: {
      start: '06:40 PM',
      end: '08:55 PM',
      description: 'Holika Dahan Muhurat (Previous Evening)'
    },
    rituals: ['Holika Dahan bonfire', 'Playing with herbal gulal & abir', 'Sharing Gujiya and festive sweets'],
    regionalVariations: [
      { region: 'Braj / Mathura', customName: 'Lathmar Holi', customRitual: 'Traditional festivities with music and stick dances in Barsana & Nandgaon' },
      { region: 'West Bengal', customName: 'Dol Jatra', customRitual: 'Radha Krishna swing festival with devotional songs' }
    ],
    contentSnippet: 'Holi marks the triumph of devotion, truth, and forgiveness, welcoming the vibrant arrival of the spring harvest season.'
  },
  {
    id: 'chaitra-navratri-2026',
    slug: 'chaitra-navratri',
    name: 'Chaitra Navratri / Ugadi / Gudi Padwa',
    nameDevanagari: 'चैत्र नवरात्रि / उगादि / गुड़ी पड़वा',
    date: '2026-03-20',
    dayOfWeek: 'Friday',
    lunarMonth: 'Chaitra',
    paksha: 'Shukla',
    tithi: 'Pratipada',
    category: 'major',
    significance: 'Vedic New Year marking the creation of the cosmos by Brahma and the invocation of the nine manifestations of Maa Durga.',
    pujaMuhurat: {
      start: '06:22 AM',
      end: '10:15 AM',
      description: 'Ghatasthapana Muhurat'
    },
    rituals: ['Ghatasthapana & Kalash Puja', 'Nine days Akhand Jyoti', 'Durga Saptashati recitation'],
    regionalVariations: [
      { region: 'Maharashtra', customName: 'Gudi Padwa', customRitual: 'Hoisting the auspicious Gudi flag outside homes' },
      { region: 'Andhra/Telangana/Karnataka', customName: 'Ugadi', customRitual: 'Tasting Ugadi Pachadi combining six tastes of life' }
    ],
    contentSnippet: 'Chaitra Navratri commences the auspicious Vikram Samvat New Year, ushering in health, abundance, and spiritual purification.'
  },
  {
    id: 'ram-navami-2026',
    slug: 'ram-navami',
    name: 'Ram Navami',
    nameDevanagari: 'राम नवमी',
    date: '2026-03-28',
    dayOfWeek: 'Saturday',
    lunarMonth: 'Chaitra',
    paksha: 'Shukla',
    tithi: 'Navami',
    category: 'jayanti',
    significance: 'Appearance day of Maryada Purushottam Lord Rama in Ayodhya at noon in the auspicious Abhijit Muhurat.',
    pujaMuhurat: {
      start: '11:15 AM',
      end: '01:30 PM',
      description: 'Rama Janmotsav Abhijit Muhurat'
    },
    rituals: ['Ramcharitmanas Akhand Path', 'Cradle rocking ritual of infant Rama at midday', 'Panakam and Sundal distribution'],
    regionalVariations: [
      { region: 'Ayodhya', customName: 'Ram Janmotsav', customRitual: 'Grand Rath Yatra and holy dip in Saryu river' },
      { region: 'Bhadrachalam', customName: 'Sita Rama Kalyanam', customRitual: 'Celestial wedding ceremony of Lord Sita and Rama' }
    ],
    contentSnippet: 'Ram Navami concludes Chaitra Navratri, honoring righteousness (Dharma), compassion, and devotion to Lord Rama.'
  },
  {
    id: 'raksha-bandhan-2026',
    slug: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    nameDevanagari: 'रक्षाबंधन',
    date: '2026-08-28',
    dayOfWeek: 'Friday',
    lunarMonth: 'Shravana',
    paksha: 'Shukla',
    tithi: 'Purnima',
    category: 'major',
    significance: 'Sacred thread festival celebrating the unbreakable bond of love, protection, and duty between brothers and sisters.',
    pujaMuhurat: {
      start: '06:05 AM',
      end: '05:35 PM',
      description: 'Auspicious Rakhi Tying Window (Bhadra Free)'
    },
    rituals: ['Tying sacred Rakhi on right wrist', 'Aarti with Akshat and sweets', 'Gift giving and lifelong protection vows'],
    contentSnippet: 'Celebrated on Shravana Purnima, Raksha Bandhan honors mutual protection, familial affection, and Vedic purity.'
  },
  {
    id: 'krishna-janmashtami-2026',
    slug: 'krishna-janmashtami',
    name: 'Krishna Janmashtami',
    nameDevanagari: 'श्री कृष्ण जन्माष्टमी',
    date: '2026-09-04',
    dayOfWeek: 'Friday',
    lunarMonth: 'Bhadrapada',
    paksha: 'Krishna',
    tithi: 'Ashtami',
    category: 'major',
    significance: 'Birth of Lord Krishna in Rohini Nakshatra at midnight to vanquish evil and establish eternal Dharma.',
    pujaMuhurat: {
      start: '11:50 PM',
      end: '12:40 AM',
      description: 'Midnight Janmotsav Nishita Muhurat'
    },
    rituals: ['Nirjala or Phalahari fast until midnight', 'Panchamrit Abhishekam of Laddu Gopal', 'Dahi Handi celebrations'],
    contentSnippet: 'Krishna Janmashtami brings immense joy, singing of bhajans, and deep meditation on the teachings of the Bhagavad Gita.'
  },
  {
    id: 'diwali-2026',
    slug: 'diwali',
    name: 'Diwali (Lakshmi Puja)',
    nameDevanagari: 'दीपावली (लक्ष्मी पूजन)',
    date: '2026-11-08',
    dayOfWeek: 'Sunday',
    lunarMonth: 'Kartika',
    paksha: 'Krishna',
    tithi: 'Amavasya',
    category: 'major',
    significance: 'The festival of lights welcoming Goddess Lakshmi into clean, illuminated homes and Lord Rama return to Ayodhya.',
    pujaMuhurat: {
      start: '05:45 PM',
      end: '07:40 PM',
      description: 'Pradosh Kaal & Vrishabha Lagna Lakshmi Puja'
    },
    rituals: ['Lighting earthen diyas with sesame or ghee', 'Lakshmi & Ganesha invocation puja', 'Rangoli artwork'],
    contentSnippet: 'Diwali dispels the darkness of ignorance and poverty, inviting the light of pure wisdom, prosperity, and divine grace.'
  }
];

export function getFestivalsForYear(year: number): FestivalItem[] {
  return FESTIVALS_DATABASE.filter(f => f.date.startsWith(year.toString()));
}

export function getFestivalsForDate(dateStr: string): FestivalItem[] {
  return FESTIVALS_DATABASE.filter(f => f.date === dateStr);
}