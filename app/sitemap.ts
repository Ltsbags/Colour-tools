import { MetadataRoute } from 'next';
import { POPULAR_CURATED_COLORS, sanitizeHex } from '@/lib/color-utils';

const BASE_URL = process.env.APP_URL || 'https://colortools.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const colorRoutes = POPULAR_CURATED_COLORS.map((c) => {
    const cleanHex = sanitizeHex(c.hex).toLowerCase();
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
