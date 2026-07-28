import { MetadataRoute } from 'next';
import { COLOR_NAMES, POPULAR_CURATED_COLORS, sanitizeHex } from '@/lib/color-utils';

const BASE_URL = process.env.APP_URL || 'https://colortools.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const hexMap = new Map<string, string>();

  // Collect all unique color hexes
  [...POPULAR_CURATED_COLORS, ...COLOR_NAMES].forEach((c) => {
    const cleanHex = sanitizeHex(c.hex).toLowerCase();
    if (!hexMap.has(cleanHex)) {
      hexMap.set(cleanHex, cleanHex);
    }
  });

  const colorRoutes = Array.from(hexMap.keys()).map((cleanHex) => {
    return {
      url: `${BASE_URL}/color/${cleanHex}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...colorRoutes,
  ];
}
