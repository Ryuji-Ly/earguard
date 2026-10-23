// Design tokens: the single source for colors, spacing and type.
// Components read from here; pages never use these values directly.

export const colors = {
  background: '#0E1014',
  surface: '#181B22',
  surfaceRaised: '#22262F',
  border: '#2E333D',
  text: '#F4F5F7',
  textMuted: '#A3A9B5',
  textInverse: '#0E1014',
  primary: '#8B7CFF',
  primaryPressed: '#7262F0',
  safe: '#3DD68C',
  caution: '#FFC145',
  danger: '#FF6B6B',
  safeSoft: '#173A2A',
  cautionSoft: '#3D3219',
  dangerSoft: '#3F1E21',
};

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const fontSize = {
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  display: 64,
};

export const lineHeight = {
  sm: 18,
  md: 22,
  lg: 24,
  xl: 30,
  display: 72,
};

// Minimum touch target (Apple HIG 44pt, Material 48dp).
export const touchTarget = 48;

export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;
