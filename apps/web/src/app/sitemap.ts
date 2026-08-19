import { MetadataRoute } from 'next';
import { INDIAN_CITIES } from '@panchang/astro-core';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vedicpanchang.internal';
  const today = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: 'always', priority: 1.0 },
    { url: `${baseUrl}/muhurat-finder`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/festivals`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 }
  ];

  // Generate 30 days of dynamic city + date URLs for top Indian cities
  for (let d = 0; d < 30; d++) {
    const target = new Date(today);
    target.setDate(today.getDate() + d);
    const dateStr = target.toISOString().split('T')[0];

    for (const city of INDIAN_CITIES) {
      entries.push({
        url: `${baseUrl}/panchang/${city.slug}/${dateStr}`,
        lastModified: today,
        changeFrequency: d === 0 ? 'always' : 'daily',
        priority: d === 0 ? 0.95 : 0.8
      });
    }
  }

  return entries;
}