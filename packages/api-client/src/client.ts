import {
  PanchangData,
  PanchangApiResponse,
  MuhuratApiResponse,
  FestivalsApiResponse,
  CitiesApiResponse,
  CityConfig,
  MuhuratCategory,
  BlogPost,
  BlogListApiResponse,
  BlogPostApiResponse
} from '@panchang/types';
import { calculatePanchang, INDIAN_CITIES, findMuhuratWindows, getFestivalsForYear, getFestivalsForDate, FESTIVALS_DATABASE } from '@panchang/astro-core';

export interface ApiClientConfig {
  baseUrl?: string;
  timeoutMs?: number;
  apiKey?: string;
  enableOfflineCalculationFallback?: boolean;
}

export class PanchangApiClient {
  private baseUrl: string;
  private timeoutMs: number;
  private enableOfflineFallback: boolean;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = (config.baseUrl || 'https://api.vedicpanchang.internal/wp-json/custom/v1').replace(/\/$/, '');
    this.timeoutMs = config.timeoutMs || 6000;
    this.enableOfflineFallback = config.enableOfflineCalculationFallback !== false; // default true
  }

  /**
   * Fetches Panchang for a specific city and date.
   * Auto-falls back to pure mathematical astronomy engine if WP backend is unreachable.
   */
  async getPanchang(city: string, date: string): Promise<PanchangData> {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), this.timeoutMs) : null;

      const url = `${this.baseUrl}/panchang/${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(date)}`;
      const res = await fetch(url, {
        signal: controller ? controller.signal : undefined,
        headers: { Accept: 'application/json' },
        next: { revalidate: 86400 } // 24 hours ISR caching in Next.js
      } as any);

      if (timeoutId) clearTimeout(timeoutId);

      if (res.ok) {
        const json = (await res.json()) as PanchangApiResponse;
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (e) {
      // Network failure or timeout
    }

    if (this.enableOfflineFallback) {
      return calculatePanchang(city, date);
    }

    throw new Error(`Failed to load panchang for ${city} on ${date}`);
  }

  /**
   * Evaluates Muhurat Windows for a category and date window.
   */
  async getMuhurat(type: MuhuratCategory, from: string, to: string, city: string = 'delhi'): Promise<MuhuratApiResponse['data']> {
    try {
      const url = `${this.baseUrl}/muhurat?type=${encodeURIComponent(type)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&city=${encodeURIComponent(city)}`;
      const res = await fetch(url, { next: { revalidate: 43200 } } as any);
      if (res.ok) {
        const json = (await res.json()) as MuhuratApiResponse;
        if (json.success && json.data) return json.data;
      }
    } catch (e) {}

    const windows = findMuhuratWindows({ type, from, to, city });
    return {
      category: type,
      city,
      from,
      to,
      totalWindows: windows.length,
      windows
    };
  }

  /**
   * Fetches Festivals calendar for a given year.
   */
  async getFestivals(year: number = 2026): Promise<FestivalsApiResponse['data']> {
    try {
      const url = `${this.baseUrl}/festivals?year=${year}`;
      const res = await fetch(url, { next: { revalidate: 86400 * 7 } } as any);
      if (res.ok) {
        const json = (await res.json()) as FestivalsApiResponse;
        if (json.success && json.data) return json.data;
      }
    } catch (e) {}

    return {
      year,
      festivals: getFestivalsForYear(year)
    };
  }

  /**
   * Fetches the supported Indian cities.
   */
  async getCities(): Promise<CityConfig[]> {
    try {
      const url = `${this.baseUrl}/cities`;
      const res = await fetch(url, { next: { revalidate: 86400 * 30 } } as any);
      if (res.ok) {
        const json = (await res.json()) as CitiesApiResponse;
        if (json.success && json.data) return json.data;
      }
    } catch (e) {}

    return INDIAN_CITIES;
  }

  /**
   * Fetches Blog Posts for Vedic Astrology Guides.
   */
  async getBlogPosts(): Promise<BlogPost[]> {
    return [
      {
        id: '1',
        slug: 'understanding-rahu-kalam-significance',
        title: 'Understanding Rahu Kalam: Why Timing Matters in Vedic Astrology',
        excerpt: 'Learn the ancient science behind the 90-minute daily Rahu period and how to safeguard your key endeavors.',
        content: 'Rahu Kalam is an inauspicious period of 90 minutes each day governed by Rahu, the northern lunar node. In Vedic tradition, commencing auspicious ceremonies, signing agreements, or initiating journeys during Rahu Kalam is strictly avoided. However, routine daily chores and spiritual meditation remain auspicious during this time.',
        category: 'panchang-guide',
        author: {
          name: 'Pt. Devadatta Shastri',
          bio: 'Senior Vedic Astrologer & Sanskrit Scholar with 30+ years experience in Muhurat calculation'
        },
        publishedAt: '2026-08-01',
        updatedAt: '2026-08-15',
        readTimeMinutes: 5,
        tags: ['Rahu Kalam', 'Panchang Guide', 'Astrology Basics'],
        seo: {
          metaTitle: 'Rahu Kalam Timing & Astrological Importance | Vedic Guide',
          metaDescription: 'Complete guide on Rahu Kalam timings, astrological calculation rules, and remedies.',
          keywords: ['rahu kalam rules', 'vedic astrology panchang', 'inauspicious timings']
        }
      },
      {
        id: '2',
        slug: 'how-to-choose-shubh-vivah-muhurat',
        title: 'How to Choose the Perfect Vivah (Wedding) Muhurat: The Vedic Checklist',
        excerpt: 'An exhaustive guide on the 10 essential planetary combinations, Sthira Rasis, and Nakshatra matches for marital harmony.',
        content: 'Choosing a wedding Muhurat involves harmonizing both the bride and groom natal charts with the cosmic energy of the wedding day. Vedic astrology emphasizes avoiding Guru and Shukra combustion, checking the strength of the 7th and 8th houses in the Lagna chart, and ensuring the Moon is situated in a favorable Nakshatra.',
        category: 'muhurat-guide',
        author: {
          name: 'Dr. Radhika Sharma',
          bio: 'Vedic Astrologer and Vastu Shastra Consultant'
        },
        publishedAt: '2026-07-20',
        updatedAt: '2026-08-10',
        readTimeMinutes: 8,
        tags: ['Vivah Muhurat', 'Marriage Astrology', 'Kundali Matching'],
        seo: {
          metaTitle: 'Wedding Muhurat Guide: How to Select Auspicious Marriage Dates',
          metaDescription: 'Discover the traditional Vedic guidelines for selecting an auspicious wedding date and Lagna timing.',
          keywords: ['vivah muhurat guide', 'marriage auspicious timings', 'wedding astrology']
        }
      },
      {
        id: '3',
        slug: 'significance-of-choghadiya-timings',
        title: 'The Significance of Day & Night Choghadiya in Daily Life',
        excerpt: 'How to use Amrit, Shubh, and Labh Choghadiyas for immediate travel, shopping, and business ventures.',
        content: 'Choghadiya is a 4-ghadi (approx 96 minutes) division of the day and night used primarily in Western and Northern India for instant auspicious timing. The seven types of Choghadiya—Amrit, Shubh, Labh, Char, Rog, Kaal, and Udveg—allow anyone to pick favorable moments without consulting complex planetary ephemeris.',
        category: 'panchang-guide',
        author: {
          name: 'Pt. Devadatta Shastri',
          bio: 'Senior Vedic Astrologer & Sanskrit Scholar'
        },
        publishedAt: '2026-06-15',
        updatedAt: '2026-08-05',
        readTimeMinutes: 6,
        tags: ['Choghadiya', 'Daily Muhurat', 'Amrit Choghadiya'],
        seo: {
          metaTitle: 'Choghadiya Explained: Meaning of Amrit, Shubh, and Labh',
          metaDescription: 'Learn how to read day and night Choghadiya tables for daily auspicious decision making.',
          keywords: ['choghadiya guide', 'amrit choghadiya meaning', 'shubh timings today']
        }
      }
    ];
  }
}

export const defaultApiClient = new PanchangApiClient();