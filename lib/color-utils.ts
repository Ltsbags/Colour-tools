export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorFormats {
  hex: string;
  rgb: RGB;
  rgbString: string;
  hsl: HSL;
  hslString: string;
  hsv: HSV;
  hsvString: string;
  cmyk: CMYK;
  cmykString: string;
  name: string;
  luminance: number;
  isDark: boolean;
  contrastWhite: number;
  contrastBlack: number;
}

export interface NamedColor {
  name: string;
  hex: string;
  category?: string;
}

// Extensive dictionary of standard and popular color names
export const COLOR_NAMES: NamedColor[] = [
  { name: 'Pure White', hex: '#FFFFFF', category: 'Neutral' },
  { name: 'Pure Black', hex: '#000000', category: 'Neutral' },
  { name: 'Red', hex: '#FF0000', category: 'Red' },
  { name: 'Crimson', hex: '#DC143C', category: 'Red' },
  { name: 'Firebrick', hex: '#B22222', category: 'Red' },
  { name: 'Coral Red', hex: '#FF4040', category: 'Red' },
  { name: 'Tomato', hex: '#FF6347', category: 'Red' },
  { name: 'Coral', hex: '#FF7F50', category: 'Orange' },
  { name: 'Orange', hex: '#FFA500', category: 'Orange' },
  { name: 'Dark Orange', hex: '#FF8C00', category: 'Orange' },
  { name: 'Gold', hex: '#FFD700', category: 'Yellow' },
  { name: 'Yellow', hex: '#FFFF00', category: 'Yellow' },
  { name: 'Lemon', hex: '#FFF700', category: 'Yellow' },
  { name: 'Amber', hex: '#FFBF00', category: 'Yellow' },
  { name: 'Lime', hex: '#00FF00', category: 'Green' },
  { name: 'Lime Green', hex: '#32CD32', category: 'Green' },
  { name: 'Emerald', hex: '#50C878', category: 'Green' },
  { name: 'Forest Green', hex: '#228B22', category: 'Green' },
  { name: 'Green', hex: '#008000', category: 'Green' },
  { name: 'Teal', hex: '#008080', category: 'Cyan' },
  { name: 'Turquoise', hex: '#40E0D0', category: 'Cyan' },
  { name: 'Cyan', hex: '#00FFFF', category: 'Cyan' },
  { name: 'Sky Blue', hex: '#87CEEB', category: 'Blue' },
  { name: 'Dodger Blue', hex: '#1E90FF', category: 'Blue' },
  { name: 'Royal Blue', hex: '#4169E1', category: 'Blue' },
  { name: 'Blue', hex: '#0000FF', category: 'Blue' },
  { name: 'Navy', hex: '#000080', category: 'Blue' },
  { name: 'Indigo', hex: '#4B0082', category: 'Violet' },
  { name: 'Purple', hex: '#800080', category: 'Violet' },
  { name: 'Violet', hex: '#EE82EE', category: 'Violet' },
  { name: 'Magenta', hex: '#FF00FF', category: 'Pink' },
  { name: 'Orchid', hex: '#DA70D6', category: 'Pink' },
  { name: 'Hot Pink', hex: '#FF69B4', category: 'Pink' },
  { name: 'Pink', hex: '#FFC0CB', category: 'Pink' },
  { name: 'Deep Pink', hex: '#FF1493', category: 'Pink' },
  { name: 'Brown', hex: '#A52A2A', category: 'Brown' },
  { name: 'Saddle Brown', hex: '#8B4513', category: 'Brown' },
  { name: 'Chocolate', hex: '#D2691E', category: 'Brown' },
  { name: 'Charcoal', hex: '#36454F', category: 'Neutral' },
  { name: 'Gray', hex: '#808080', category: 'Neutral' },
  { name: 'Silver', hex: '#C0C0C0', category: 'Neutral' },
  { name: 'Slate Gray', hex: '#708090', category: 'Neutral' },
  { name: 'Cool Gray', hex: '#8C92AC', category: 'Neutral' },
  { name: 'Warm Cream', hex: '#FFFDD0', category: 'Neutral' },
  { name: 'Ivory', hex: '#FFFFF0', category: 'Neutral' },
  { name: 'Beige', hex: '#F5F5DC', category: 'Neutral' },
  { name: 'Cornflower Blue', hex: '#6495ED', category: 'Blue' },
  { name: 'Steel Blue', hex: '#4682B4', category: 'Blue' },
  { name: 'Midnight Blue', hex: '#191970', category: 'Blue' },
  { name: 'Spring Green', hex: '#00FF7F', category: 'Green' },
  { name: 'Sea Green', hex: '#2E8B57', category: 'Green' },
  { name: 'Mint Green', hex: '#98FF98', category: 'Green' },
  { name: 'Peach', hex: '#FFDAB9', category: 'Orange' },
  { name: 'Salmon', hex: '#FA8072', category: 'Orange' },
  { name: 'Lavender', hex: '#E6E6FA', category: 'Violet' },
  { name: 'Plum', hex: '#DDA0DD', category: 'Violet' },
  { name: 'Olive', hex: '#808000', category: 'Green' },
  { name: 'Maroon', hex: '#800000', category: 'Red' },
  { name: 'Aquamarine', hex: '#7FFFD4', category: 'Cyan' },
  { name: 'Periwinkle', hex: '#CCCCFF', category: 'Blue' },
  { name: 'Chartreuse', hex: '#7FFF00', category: 'Green' },
  { name: 'Khaki', hex: '#F0E68C', category: 'Yellow' },
  { name: 'Burlywood', hex: '#DEB887', category: 'Brown' },
  { name: 'Rosy Brown', hex: '#BC8F8F', category: 'Brown' },
  { name: 'Thistle', hex: '#D8BFD8', category: 'Violet' },
  { name: 'Moccasin', hex: '#FFE4B5', category: 'Orange' },
  { name: 'Papaya Whip', hex: '#FFEFD5', category: 'Orange' },
  { name: 'Blanched Almond', hex: '#FFEBCD', category: 'Neutral' },
  { name: 'Antique White', hex: '#FAEBD7', category: 'Neutral' },
  { name: 'Linen', hex: '#FAF0E6', category: 'Neutral' },
  { name: 'Old Lace', hex: '#FDF5E6', category: 'Neutral' },
  { name: 'Sea Shell', hex: '#FFF5EE', category: 'Neutral' },
  { name: 'Snow', hex: '#FFFAFA', category: 'Neutral' },
  { name: 'Ghost White', hex: '#F8F8FF', category: 'Neutral' },
  { name: 'Alice Blue', hex: '#F0F8FF', category: 'Blue' },
  { name: 'Cadet Blue', hex: '#5F9EA0', category: 'Blue' },
  { name: 'Medium Slate Blue', hex: '#7B68EE', category: 'Violet' },
  { name: 'Dark Violet', hex: '#9400D3', category: 'Violet' },
  { name: 'Dark Magenta', hex: '#8B008B', category: 'Pink' },
  { name: 'Medium Violet Red', hex: '#C71585', category: 'Pink' },
  { name: 'Crimson Tide', hex: '#990000', category: 'Red' },
  { name: 'Ultra Violet', hex: '#5F4B8B', category: 'Violet' },
  { name: 'Living Coral', hex: '#FF6F61', category: 'Orange' },
  { name: 'Classic Blue', hex: '#0F4C81', category: 'Blue' },
  { name: 'Illuminating Yellow', hex: '#F5DF4D', category: 'Yellow' },
  { name: 'Very Peri', hex: '#6667AB', category: 'Blue' },
  { name: 'Viva Magenta', hex: '#BE3455', category: 'Red' },
  { name: 'Peach Fuzz', hex: '#FFBE98', category: 'Orange' },
  { name: 'Electric Cyan', hex: '#00E5FF', category: 'Cyan' },
  { name: 'Neon Green', hex: '#39FF14', category: 'Green' },
  { name: 'Cyber Yellow', hex: '#FFD300', category: 'Yellow' },
  { name: 'Sunset Orange', hex: '#FD5E53', category: 'Orange' },
  { name: 'Midnight Purple', hex: '#2E0854', category: 'Violet' },
];

export const POPULAR_CURATED_COLORS = [
  { hex: '#FF5733', name: 'Persimmon', category: 'Warm' },
  { hex: '#3B82F6', name: 'Royal Sapphire', category: 'Cool' },
  { hex: '#10B981', name: 'Emerald Gem', category: 'Cool' },
  { hex: '#F59E0B', name: 'Amber Gold', category: 'Warm' },
  { hex: '#8B5CF6', name: 'Mystic Purple', category: 'Cool' },
  { hex: '#EC4899', name: 'Vibrant Pink', category: 'Warm' },
  { hex: '#06B6D4', name: 'Electric Teal', category: 'Cool' },
  { hex: '#64748B', name: 'Slate Blue', category: 'Neutral' },
  { hex: '#EF4444', name: 'Bright Crimson', category: 'Warm' },
  { hex: '#84CC16', name: 'Lime Citrus', category: 'Cool' },
  { hex: '#6366F1', name: 'Indigo Violet', category: 'Cool' },
  { hex: '#D97706', name: 'Burnt Amber', category: 'Warm' },
  { hex: '#0284C7', name: 'Ocean Cyan', category: 'Cool' },
  { hex: '#059669', name: 'Forest Jade', category: 'Cool' },
  { hex: '#DC2626', name: 'Ruby Red', category: 'Warm' },
  { hex: '#7C3AED', name: 'Deep Violet', category: 'Cool' },
  { hex: '#DB2777', name: 'Hot Magenta', category: 'Warm' },
  { hex: '#475569', name: 'Dark Slate', category: 'Neutral' },
  { hex: '#14B8A6', name: 'Seafoam Mint', category: 'Cool' },
  { hex: '#EAB308', name: 'Sunburst Yellow', category: 'Warm' },
  { hex: '#F97316', name: 'Tangerine', category: 'Warm' },
  { hex: '#000000', name: 'True Obsidian', category: 'Neutral' },
  { hex: '#F8FAFC', name: 'Crisp Snow', category: 'Neutral' },
  { hex: '#1E293B', name: 'Midnight Navy', category: 'Neutral' },
];

// Clean Hex normalization
export function sanitizeHex(input: string): string {
  let cleaned = input.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return '3B82F6'; // Default fallback
  }
  return cleaned.toUpperCase();
}

export function isValidHex(input: string): boolean {
  const cleaned = input.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleaned);
}

// Convert Hex to RGB
export function hexToRgb(hexInput: string): RGB {
  const hex = sanitizeHex(hexInput);
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const rc = clamp(r).toString(16).padStart(2, '0');
  const gc = clamp(g).toString(16).padStart(2, '0');
  const bc = clamp(b).toString(16).padStart(2, '0');
  return `#${rc}${gc}${bc}`.toUpperCase();
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): RGB {
  const hNorm = (h % 360 + 360) % 360 / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tAdj = t;
    if (tAdj < 0) tAdj += 1;
    if (tAdj > 1) tAdj -= 1;
    if (tAdj < 1 / 6) return p + (q - p) * 6 * tAdj;
    if (tAdj < 1 / 2) return q;
    if (tAdj < 2 / 3) return p + (q - p) * (2 / 3 - tAdj) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = hue2rgb(p, q, hNorm + 1 / 3);
  const g = hue2rgb(p, q, hNorm);
  const b = hue2rgb(p, q, hNorm - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Convert RGB to HSV
export function rgbToHsv(r: number, g: number, b: number): HSV {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

// Convert HSV to RGB
export function hsvToRgb(h: number, s: number, v: number): RGB {
  const hNorm = ((h % 360 + 360) % 360) / 60;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const vNorm = Math.max(0, Math.min(100, v)) / 100;

  const i = Math.floor(hNorm);
  const f = hNorm - i;
  const p = vNorm * (1 - sNorm);
  const q = vNorm * (1 - sNorm * f);
  const t = vNorm * (1 - sNorm * (1 - f));

  let rNorm = 0, gNorm = 0, bNorm = 0;

  switch (i % 6) {
    case 0: rNorm = vNorm; gNorm = t; bNorm = p; break;
    case 1: rNorm = q; gNorm = vNorm; bNorm = p; break;
    case 2: rNorm = p; gNorm = vNorm; bNorm = t; break;
    case 3: rNorm = p; gNorm = q; bNorm = vNorm; break;
    case 4: rNorm = t; gNorm = p; bNorm = vNorm; break;
    case 5: rNorm = vNorm; gNorm = p; bNorm = q; break;
  }

  return {
    r: Math.round(rNorm * 255),
    g: Math.round(gNorm * 255),
    b: Math.round(bNorm * 255),
  };
}

// Convert RGB to CMYK
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

// Calculate Relative Luminance for WCAG Contrast
export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Get Contrast Ratio between two RGB values
export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// Find Nearest Color Name from dataset using Euclidean distance in RGB
export function getNearestColorName(hexInput: string): string {
  const targetRgb = hexToRgb(hexInput);
  
  // Exact match first
  const exact = COLOR_NAMES.find(c => c.hex.toLowerCase() === `#${sanitizeHex(hexInput)}`.toLowerCase());
  if (exact) return exact.name;

  let minDistance = Infinity;
  let closestName = 'Custom Color';

  for (const c of COLOR_NAMES) {
    const rgb = hexToRgb(c.hex);
    // Weighted Euclidean distance for better perception
    const dist = Math.sqrt(
      2 * Math.pow(targetRgb.r - rgb.r, 2) +
      4 * Math.pow(targetRgb.g - rgb.g, 2) +
      3 * Math.pow(targetRgb.b - rgb.b, 2)
    );
    if (dist < minDistance) {
      minDistance = dist;
      closestName = c.name;
    }
  }

  return closestName;
}

// Complete Color Details Extractor
export function getColorFormats(hexInput: string): ColorFormats {
  const cleanHex = sanitizeHex(hexInput);
  const hex = `#${cleanHex}`;
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const name = getNearestColorName(cleanHex);

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWhite = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  return {
    hex,
    rgb,
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsv,
    hsvString: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
    cmyk,
    cmykString: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    name,
    luminance,
    isDark: luminance < 0.5,
    contrastWhite,
    contrastBlack,
  };
}

// Generate Color Shades (mixing with Black) and Tints (mixing with White)
export interface ShadeTint {
  hex: string;
  name: string;
  percentage: number;
}

export function getShadesAndTints(hexInput: string): { shades: ShadeTint[]; tints: ShadeTint[] } {
  const rgb = hexToRgb(hexInput);
  const shades: ShadeTint[] = [];
  const tints: ShadeTint[] = [];

  // Tints (Lightening towards white)
  for (let i = 1; i <= 10; i++) {
    const factor = i / 10;
    const r = Math.round(rgb.r + (255 - rgb.r) * factor);
    const g = Math.round(rgb.g + (255 - rgb.g) * factor);
    const b = Math.round(rgb.b + (255 - rgb.b) * factor);
    const tintHex = rgbToHex(r, g, b);
    tints.push({
      hex: tintHex,
      name: `${Math.round(factor * 100)}% Tint`,
      percentage: Math.round(factor * 100),
    });
  }

  // Shades (Darkening towards black)
  for (let i = 1; i <= 10; i++) {
    const factor = i / 10;
    const r = Math.round(rgb.r * (1 - factor));
    const g = Math.round(rgb.g * (1 - factor));
    const b = Math.round(rgb.b * (1 - factor));
    const shadeHex = rgbToHex(r, g, b);
    shades.push({
      hex: shadeHex,
      name: `${Math.round(factor * 100)}% Shade`,
      percentage: Math.round(factor * 100),
    });
  }

  return { shades, tints };
}

// Generate Palette Harmonies (Complementary, Analogous, Triadic, Monochromatic, Split-Complementary, Tetradic)
export interface HarmonyPalette {
  type: string;
  description: string;
  colors: { hex: string; name: string }[];
}

export function getHarmonies(hexInput: string): HarmonyPalette[] {
  const rgb = hexToRgb(hexInput);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const makeColor = (hOffset: number, sMod = 0, lMod = 0) => {
    const newH = (hsl.h + hOffset + 360) % 360;
    const newS = Math.max(0, Math.min(100, hsl.s + sMod));
    const newL = Math.max(0, Math.min(100, hsl.l + lMod));
    const newRgb = hslToRgb(newH, newS, newL);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    return { hex, name: getNearestColorName(hex) };
  };

  const baseColor = { hex: `#${sanitizeHex(hexInput)}`, name: getNearestColorName(hexInput) };

  return [
    {
      type: 'Complementary',
      description: 'Opposite hue on the color wheel for maximum vibrant contrast.',
      colors: [baseColor, makeColor(180)],
    },
    {
      type: 'Analogous',
      description: 'Adjacent colors creating harmonious, soothing schemes.',
      colors: [makeColor(-30), baseColor, makeColor(30)],
    },
    {
      type: 'Triadic',
      description: 'Three evenly spaced colors offering balanced contrast and warmth.',
      colors: [baseColor, makeColor(120), makeColor(240)],
    },
    {
      type: 'Monochromatic',
      description: 'Variations in lightness and saturation of a single hue.',
      colors: [
        makeColor(0, -20, 25),
        makeColor(0, -10, 12),
        baseColor,
        makeColor(0, 10, -15),
        makeColor(0, 20, -30),
      ],
    },
    {
      type: 'Split-Complementary',
      description: 'Base color paired with the two colors adjacent to its complement.',
      colors: [baseColor, makeColor(150), makeColor(210)],
    },
    {
      type: 'Tetradic (Square)',
      description: 'Four colors arranged into two complementary pairs.',
      colors: [baseColor, makeColor(90), makeColor(180), makeColor(270)],
    },
  ];
}

// Generate Code Snippets
export function generateCssSnippets(hexInput: string) {
  const color = getColorFormats(hexInput);
  return {
    cssVars: `:root {\n  --color-primary: ${color.hex};\n  --color-rgb: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b};\n  --color-hsl: ${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%;\n}`,
    tailwind: `bg-[${color.hex}] text-[${color.contrastWhite > 4.5 ? '#FFFFFF' : '#000000'}] border-[${color.hex}]`,
    background: `background-color: ${color.hex};`,
    text: `color: ${color.hex};`,
    border: `border: 2px solid ${color.hex};`,
    boxShadow: `box-shadow: 0 10px 25px -5px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.4);`,
    linearGradient: `background: linear-gradient(135deg, ${color.hex} 0%, #${sanitizeHex(getHarmonies(hexInput)[0].colors[1].hex)} 100%);`,
  };
}

// Generate Random Hex
export function getRandomHex(): string {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
