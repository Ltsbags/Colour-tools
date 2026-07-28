import { getColorFormats, getHarmonies } from './color-utils';

export const SITE_NAME = 'Colour Lab';
export const SITE_DESCRIPTION = 'Explore color formats, convert HEX, RGB, HSL, HSV, generate palettes, inspect WCAG contrast, and copy CSS code instantly.';
export const BASE_URL = process.env.APP_URL || 'https://colortools.dev';

export function getHomeMetadata() {
  const defaultOgImage = `${BASE_URL}/api/og?hex=3B82F6`;
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
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Color Tools & Converter`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [defaultOgImage],
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}

export function getColorPageMetadata(hexInput: string) {
  const formats = getColorFormats(hexInput);
  const cleanHex = formats.hex.replace('#', '').toLowerCase();
  const title = `#${cleanHex.toUpperCase()} Color Code (${formats.name}) - HEX, RGB, HSL & Palettes`;
  const description = `#${cleanHex.toUpperCase()} (${formats.name}) color information: RGB (${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b}), HSL (${formats.hsl.h}, ${formats.hsl.s}%, ${formats.hsl.l}%), HSV, CMYK. Explore color harmonies, shades, tints, and ready-to-use CSS snippets.`;
  const pageUrl = `${BASE_URL}/color/${cleanHex}`;
  const ogImageUrl = `${BASE_URL}/api/og?hex=${cleanHex}`;

  return {
    title,
    description,
    keywords: [
      `#${cleanHex.toUpperCase()}`,
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
      url: pageUrl,
      siteName: SITE_NAME,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `#${cleanHex.toUpperCase()} (${formats.name}) Color Swatch Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
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
