import { MetadataRoute } from 'next';

const BASE_URL = process.env.APP_URL || 'https://colortools.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
