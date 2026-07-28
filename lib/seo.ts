import { getColorFormats, getHarmonies } from './color-utils';

export const SITE_NAME = 'Color Tools & Converter';
export const SITE_DESCRIPTION = 'Explore color formats, convert HEX, RGB, HSL, HSV, generate palettes, inspect WCAG contrast, and copy CSS code instantly.';
export const BASE_URL = process.env.APP_URL || 'https://colortools.dev';

export function getHomeMetadata() {
  return {
    title: `${SITE_NAME} | Fast HEX, RGB, HSL Converter & Palette Generator`,
    description: 'Convert colors instantly (HEX, RGB, HSL, HSV, CMYK), inspect contrast, build palettes, generate CSS, and explore popular colors for designers and developers.',
    keywords: ['color converter', 'hex to rgb', 'hsl converter', 'color picker', 'palette generator', 'css color generator', 'wcag contrast checker', 'color tools'],
    openGraph: {
      title: `${SITE_NAME} - Modern Color Utility for Developers`,
      description: SITE_DESCRIPTION,
      url: BASE_URL,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}

export function getColorPageMetadata(hexInput: string) {
  const formats = getColorFormats(hexInput);
  const title = `#${formats.hex.replace('#', '')} Color Code (${formats.name}) - HEX, RGB, HSL & Palettes`;
  const description = `#${formats.hex.replace('#', '')} (${formats.name}) color information: RGB (${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b}), HSL (${formats.hsl.h}, ${formats.hsl.s}%, ${formats.hsl.l}%), HSV, CMYK. Explore color harmonies, shades, tints, and ready-to-use CSS snippets.`;

  return {
    title,
    description,
    keywords: [
      `#${formats.hex.replace('#', '')}`,
      `${formats.name} color`,
      `${formats.hex} hex code`,
      `${formats.rgbString}`,
      `${formats.hslString}`,
      'color converter',
      'color shades',
      'color palettes',
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/color/${formats.hex.replace('#', '').toLowerCase()}`,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/color/${formats.hex.replace('#', '').toLowerCase()}`,
    },
  };
}

export function getColorJsonLd(hexInput: string) {
  const formats = getColorFormats(hexInput);
  const harmonies = getHarmonies(hexInput);
  const pageUrl = `${BASE_URL}/color/${formats.hex.replace('#', '').toLowerCase()}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `#${formats.hex.replace('#', '')} Color Code - ${formats.name}`,
        description: `Color details for ${formats.hex} (${formats.name}) including RGB, HSL, HSV, CMYK conversions, contrast ratio, and complementary palettes.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': BASE_URL,
          name: SITE_NAME,
          url: BASE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Color Explorer',
            item: `${BASE_URL}/#colors`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${formats.hex} (${formats.name})`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ColorPalette',
        name: `${formats.name} Complementary Palette`,
        colors: harmonies[0].colors.map(c => c.hex),
      },
    ],
  };
}
