import { Text as RNText, StyleSheet } from 'react-native';
import { colors, typography, type TypographyVariant } from '@/theme';

export type TextTone = 'default' | 'muted' | 'inverse' | 'primary' | 'safe' | 'caution' | 'danger';

interface TextProps {
  children: React.ReactNode;
  // One named style from the type scale (font, size and weight together).
  variant?: TypographyVariant;
  // Defaults to 'muted' for subtitles and 'default' for everything else.
  tone?: TextTone;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  accessibilityRole?: 'header' | 'text';
  testID?: string;
}

export function Text({
  children,
  variant = 'body',
  tone = variant === 'subtitle' ? 'muted' : 'default',
  align = 'left',
  numberOfLines,
  accessibilityRole,
  testID,
}: TextProps) {
  return (
    <RNText
      style={[variantStyles[variant], toneStyles[tone], { textAlign: align }]}
      numberOfLines={numberOfLines}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {children}
    </RNText>
  );
}

const variantStyles = StyleSheet.create(typography);

const toneStyles = StyleSheet.create({
  default: { color: colors.text },
  muted: { color: colors.textMuted },
  inverse: { color: colors.textInverse },
  primary: { color: colors.primary },
  safe: { color: colors.safe },
  caution: { color: colors.caution },
  danger: { color: colors.danger },
});
