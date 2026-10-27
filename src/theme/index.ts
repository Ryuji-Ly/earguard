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

// One font family (Inter) in three weights. Each weight is its own font file, so on
// Android the weight is chosen through the family name, not fontWeight.
// The names must match the keys passed to useFonts in app/_layout.tsx.
export const fontFamily = {
  regular: 'Inter_400Regular',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

// The complete type scale. Text picks one of these by name, so every screen
// uses the same handful of styles instead of mixing sizes and weights freely.
export const typography = {
  display: { fontFamily: fontFamily.bold, fontSize: 64, lineHeight: 72 }, // the big dB number
  title: { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 32 }, // screen titles
  heading: { fontFamily: fontFamily.semibold, fontSize: 18, lineHeight: 24 }, // card titles, key values
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 }, // normal text, inputs
  button: { fontFamily: fontFamily.semibold, fontSize: 16, lineHeight: 24 }, // button labels
  subtitle: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 }, // all secondary/supporting text
  label: { fontFamily: fontFamily.semibold, fontSize: 14, lineHeight: 20 }, // badges, chips, tabs, field labels
};

// Minimum touch target (Apple HIG 44pt, Material 48dp).
export const touchTarget = 48;

export type Spacing = keyof typeof spacing;
export type TypographyVariant = keyof typeof typography;
