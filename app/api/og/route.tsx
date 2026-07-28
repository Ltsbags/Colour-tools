import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getColorFormats, sanitizeHex } from '@/lib/color-utils';

function getLightOrDarkText(hex: string) {
  const clean = sanitizeHex(hex);
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 140 ? '#0f172a' : '#ffffff';
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hexParam = searchParams.get('hex') || '3B82F6';
    const cleanHex = sanitizeHex(hexParam);
    const formats = getColorFormats(cleanHex);
    const textColor = getLightOrDarkText(cleanHex);
    const mutedTextColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.75)';
    const cardBg = textColor === '#ffffff' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.35)';
    const borderColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: `#${cleanHex}`,
            padding: '60px',
            fontFamily: 'sans-serif',
            color: textColor,
          }}
        >
          {/* Top Header / Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: textColor,
                  opacity: 0.9,
                }}
              />
              <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                Colour Lab
              </span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: 500, color: mutedTextColor }}>
              colortools.dev
            </span>
          </div>

          {/* Middle Body - Big Hex & Color Name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: mutedTextColor,
              }}
            >
              {formats.name}
            </span>
            <span
              style={{
                fontSize: '84px',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1,
              }}
            >
              #{cleanHex.toUpperCase()}
            </span>
          </div>

          {/* Bottom Card - Color Formats */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              padding: '24px 36px',
              borderRadius: '20px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: mutedTextColor, textTransform: 'uppercase' }}>
                RGB
              </span>
              <span style={{ fontSize: '22px', fontWeight: 700 }}>
                {formats.rgb.r}, {formats.rgb.g}, {formats.rgb.b}
              </span>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: borderColor }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: mutedTextColor, textTransform: 'uppercase' }}>
                HSL
              </span>
              <span style={{ fontSize: '22px', fontWeight: 700 }}>
                {formats.hsl.h}°, {formats.hsl.s}%, {formats.hsl.l}%
              </span>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: borderColor }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: mutedTextColor, textTransform: 'uppercase' }}>
                CMYK
              </span>
              <span style={{ fontSize: '22px', fontWeight: 700 }}>
                {formats.cmyk.c}%, {formats.cmyk.m}%, {formats.cmyk.y}%, {formats.cmyk.k}%
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(`Failed to generate the image: ${error.message}`, {
      status: 500,
    });
  }
}
