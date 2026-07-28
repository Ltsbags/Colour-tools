import React from 'react';
import { Metadata } from 'next';
import { getColorPageMetadata, getColorJsonLd } from '@/lib/seo';
import { sanitizeHex } from '@/lib/color-utils';
import { ColorDetailClient } from './ColorDetailClient';

interface Props {
  params: Promise<{ hex: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const hex = sanitizeHex(resolvedParams.hex);
  return getColorPageMetadata(hex);
}

export default async function ColorPage({ params }: Props) {
  const resolvedParams = await params;
  const hex = sanitizeHex(resolvedParams.hex);
  const jsonLd = getColorJsonLd(hex);

  return (
    <>
      {/* Dynamic JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorDetailClient hex={hex} />
    </>
  );
}
